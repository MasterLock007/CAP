import { AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Alarma } from './../../interfaces/alarmaInterfaz';
import { Cita } from './../../clases/Cita';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from "firebase";
import { interval } from 'rxjs';

import { UsersserviceProvider } from '../usersservice/usersservice';

/*
  Generated class for the NotificacionesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificacionesProvider {
  private subscripcion;
  private ncitas = 0;
  private alarmas: Alarma[] = [];
  private notificar: boolean = false;
  constructor(
    public http: Http,
    public localNoti: LocalNotifications,
    public alertCtrl: AlertController
  ) {
    console.log('Hello NotificacionesProvider Provider');
  }

  toDate(fecha: string, hora: string) {
    if (fecha != undefined && fecha != "" && hora != undefined && hora != "") {//compobar que la fecha y la hora no esten en blanco
      //convertir fecha y hora en un arreglo
      var sfecha = fecha.split('-');
      var shora = hora.split(':');
      if (shora.length < 3) {//si la hora no tiene segundo añadir un cero
        shora.push('0');
      }
      //guardar fecha y hora en una variable de tipo Date
      var fechahora = new Date();
      fechahora.setDate(parseInt(sfecha[2]));
      fechahora.setMonth(parseInt(sfecha[1])-1);
      fechahora.setFullYear(parseInt(sfecha[0]));
      fechahora.setHours(parseInt(shora[0]));
      fechahora.setMinutes(parseInt(shora[1]));
      fechahora.setSeconds(parseInt(shora[2]));
      return fechahora;//retornar variable de tipo Date
    } else {
      return new Date();// retornar fecha actual
    }
  }

  millisToString(millis) {
    let hh = 0;
    let mm = 0;
    let ss = Math.trunc(millis / 1000);
    if (ss > 59) {
      mm = Math.trunc(ss / 60);
      ss = ss % 60;
      if (mm > 59) {
        hh = Math.trunc(mm / 60);
        mm = mm % 60;
      }
    }
    return [hh, mm, ss]
  }

  public iniciar() {
    this.getcitas();
  }

  getcitas() {
    var UID = UsersserviceProvider.userUID;
    var referencia = firebase.database().ref("citas").orderByChild("paciente").equalTo(UID);
    referencia.once("value", snap => {
      var valor = snap.val();
      for (let i in valor) {
        this.ncitas++;
      }
    }).then(() => {
      this.escucharalarmas();
      referencia.on("child_added", snap => {
        let ahora = new Date().getTime();
        this.addCita(snap.val(), snap.key, ahora,false);
        if (!this.notificar) {
          this.ncitas--;
          if (this.ncitas <= 0) {
            this.notificar = true;
          }
        }
      });
      referencia.on("child_changed", snap => {
        let ahora = new Date().getTime();
        let p=this.buscarcita(snap.key);
        if(p!=null){
          this.alarmas.splice(p,1);
        }
        this.addCita(snap.val(),snap.key,ahora,true)
      });
      referencia.on("child_removed", snap => {
        let p = this.buscarcita(snap.key);
        if (p != null) {
          let alarma=this.alarmas[p];
          let titulo="Se cancelo una cita";
          let mensaje="El veterinario "+alarma.cita.usuario.nombre+" cancelo la cita del "+alarma.cita.data.fecha +" de " +alarma.cita.mascota.nombre;
          this.crearNotificacion(titulo,mensaje);
          this.mostrarAlerta(titulo,mensaje);
          console.log(mensaje);
          this.alarmas.splice(p,1);
        } else {
          console.log("se elimino una cita del historial")
        }
      });
    });
    console.log("alarmas:" + this.alarmas.length);
  }

  escucharalarmas() {
    this.subscripcion = interval(5000).subscribe(x => {
      let ahora = new Date().getTime();
      for (let i in this.alarmas) {
        let alarma=this.alarmas[i];
        if (alarma.time < ahora) {//si ya se paso
          this.alarmas.splice(parseInt(i), 1);
        } else {
          let dif = alarma.time - ahora;
          if (dif < 10800000 && alarma.cita.mascota!=undefined && !alarma.notificado) {//si faltan menos de 3 horas
            let tiempo=this.millisToString(dif);
            let unidad="";
            let cantidad=0;
            if(tiempo[0]!=0){
              unidad="horas";
              cantidad=tiempo[0];
            }else if(tiempo[1]!=0){
              unidad="minutos";
              cantidad=tiempo[1];
            }else{
              unidad="segundos";
              cantidad=tiempo[2];
            }
            let titulo="No pierdas tu cita";
            let mensaje="Faltan menos de "+cantidad+" "+unidad+" para la cita cita de "+alarma.cita.mascota.nombre;
            mensaje+=" con el veterinario "+alarma.cita.usuario.nombre;
            this.crearNotificacion(titulo,mensaje);
            this.mostrarAlerta(titulo,mensaje);
            console.log(mensaje);
            alarma.notificado=true;
          }
        }
      }
    });
  }


  addCita(valor: any, key: any, ahora: number,ismodificacion:boolean) {
    let fecha: string = valor.fecha;
    let hora: string = valor.hora;
    let fechahora= this.toDate(fecha, hora).getTime();
    var alarma:Alarma;
    if (fechahora > ahora) {
      alarma= {
        cita: new Cita(valor, key),
        time: fechahora,
        notificado: false
      };
      this.alarmas.push(alarma);
      if(alarma.cita.data)
      if (this.notificar) {
        this.notificarNuevaCita(alarma.cita,ismodificacion);
      }
    }

  }

  notificarNuevaCita(cita:Cita,ismodificacion:boolean){
    var veterinario;
    var mascota;
    var referencia=firebase.database().ref("users/"+cita.data.veterinario+"/nombre").once('value',snap=>{
      veterinario=snap.val();
    }).then(()=>{
      firebase.database().ref().child("mascotas/"+cita.data.paciente+"/"+cita.data.mascota+"/nombre").once('value',(snap)=>{
        mascota=snap.val();
      }).then(()=>{
        var titulo="";
        var mensaje="";
        if(ismodificacion){
          titulo="Se modifico una cita";
          mensaje="El veterinario "+veterinario+" modifico una cita de " +mascota;
        }else{
          titulo="Se registro una cita";
          mensaje="El veterinario "+veterinario+" agendo una cita para " +mascota;
          mensaje += " el "+cita.data.fecha+" a las "+cita.data.hora;
        }
        this.crearNotificacion(titulo,mensaje);
        this.mostrarAlerta(titulo,mensaje);
        console.log(mensaje);
      });
    });
  }

  buscarcita(key) {
    var p = null;
    for (let i in this.alarmas) {
      if (this.alarmas[i].cita.key == key) {
        p = i;
        break;
      }
    }
    return p;
  }
  crearNotificacion(titulo: string, texto: string) {
    this.localNoti.schedule({
      title: titulo,
      text: texto,
      timeoutAfter: 1000
    });
  }
  mostrarAlerta(msj1, msj2) {
    let alert = this.alertCtrl.create({
      title: msj1,
      subTitle: msj2,
      buttons: ["OK"]
    });
    alert.present();
  }
}
