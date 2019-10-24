import { Usuario } from './../../clases/Usuario';
import { Mascota } from './../../clases/Mascota';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
/**
 * Generated class for the AgendarcitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-agendarcita',
  templateUrl: 'agendarcita.html',
})
export class AgendarcitaPage {

  myForm: FormGroup;
  mascota:string;
  paciente:string;
  uid=UsersserviceProvider.userUID;

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.mascota=navParams.get("mascota");
    this.paciente=navParams.get("paciente");
    this.myForm = this.createMyForm();
    console.log(this.myForm);
    console.log("mascota: "+this.mascota);
   // console.log("manda snaps" + Object.keys(this.mandaSnap.val())[0]);    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendarcitaPage');
  }

  saveData() {
    //this.navCtrl.setRoot(HistorialPage); //manda a home sin la flecha de arriba para regresar
    this.navCtrl.pop();//cerrar ventana de agendar citas
    //  this.myForm.reset(); //LIMPIA LOS CAMPOS DEL FORMULARIO
  }

  enviarDatosVeter() {
    console.log('Veterinario'+this.myForm.value.paciente);                             
    console.log('paciente'+this.uid);                             
    var mensajesRef = firebase.database().ref().child("citas");
    mensajesRef.push({
      tipo: this.myForm.value.tipo,
      fecha: this.myForm.value.fecha,
      hora: this.myForm.value.hora,
      motivo: this.myForm.value.motivo,
      veterinario: this.uid,
      paciente:this.paciente,
      mascota:this.mascota
    });
    
    /*
    De Vacunas
    FechaAplicacion
    NombreVacuna
    FechaProximaVac

    Cita:
    Id_usuario
    Id_veterinario

    Fecha
    Hora
    Motivo
    Veterinario:
    Cédula
    Especialidad
    Id_vetetinario*/
  }

  
  private createMyForm() {  //VALIDA QUE EL FORMULARIO ESTE VALIDADO Y ASI SE PUEDA
    return this.formBuilder.group({
      tipo: ['', Validators.required],
       //: ['', Validators.required],
      fecha: ['', Validators.required],
    //  dateEnd: ['', Validators.required],
      hora: ['', Validators.required],
     // timeEnd: ['', Validators.required],
      motivo: ['', Validators.required],
    //  invitados: ['', Validators.required]
    });
  }

}