import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-respuestas',
  templateUrl: 'respuestas.html',
})
export class RespuestasPage {


  idRespuesta: any;
  ref: firebase.database.Reference;
  @ViewChild("content") content: any;
  resp: string = "";
  resps = [];
  usuario: any;
  hora: any;
  dia: any;
  respuestas: any;
  rfc: firebase.database.Reference;
  id: string = "";
  categoria: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.id = navParams.get("id");
    this.categoria = navParams.get("cat");
    this.usuario = navParams.get("usuario");
    console.log(this.id);
    console.log(this.categoria);
    this.getRespuestas(this.categoria, this.id);
  }

  getRespuestas(catForo: string, idPub: string) {
    this.rfc = firebase.database().ref().child("publicaciones").child(catForo).child(idPub).child("respuestas");
    this.rfc.on("value", (snap) => {
      var data = snap.val();
      this.resps = [];
      for (var key in data) {
        this.resps.push(data[key]);
      }
    });
  }

  sendRespuesta() {
    if (this.resp != "") {
      var fecha = new Date();
      this.dia = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
      this.hora = fecha.getHours() + ":" + fecha.getMinutes();
      this.ref = firebase.database().ref().child("publicaciones").child(this.categoria).child(this.id).child("respuestas");
      this.idRespuesta = this.ref.push().key;
      this.ref.child(this.idRespuesta).set({
        respuesta: this.resp,
        usuario: this.usuario,
        dia: this.dia,
        hora: this.hora,
        id: this.idRespuesta
      });
      this.resp = "";
    } else {
      let alert = this.alertCtrl.create({
        title: "Error",
        message: "El campo no puede estar vacio",
        buttons: [
          {
            text: "Aceptar",
            handler: () => {
            }
          }
        ]
      });
      alert.present();

    }


  }
}
