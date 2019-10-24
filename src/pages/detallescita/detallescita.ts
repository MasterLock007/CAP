import { EditarcitaPage } from './../editarcita/editarcita';
import { UsersserviceProvider } from './../../providers/usersservice/usersservice';
import { Cita } from './../../clases/Cita';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from "firebase";
/**
 * Generated class for the DetallescitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detallescita',
  templateUrl: 'detallescita.html',
})
export class DetallescitaPage {
  cita:Cita;
  editable:boolean;
  tipoUsuario=UsersserviceProvider.userdata.tipo_usuario;
  uid=UsersserviceProvider.userUID;
  constructor(public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
    this.cita=navParams.get("cita");
    if(!this.cita.detalles){
      this.cita.getDetalles(this.tipoUsuario);
      console.log(this.cita);
      console.log(this.cita.data);
    }
    this.editable=this.cita.data.veterinario==this.uid;
  }
  
  irEditarCita(){
    this.navCtrl.push(EditarcitaPage,{"cita":this.cita});
  }

  eliminarCita(){
    let confim=this.alertCtrl.create({
      title:"Eliminar",
      message:"Desea eliminar este elemento",
      buttons:[
        {
          text: "Cancelar",
          handler:()=>{
          }
        },
        {
          text: "Aceptar",
          handler:()=>{
            firebase.database().ref().child("citas/"+this.cita.key).remove();
            this.navCtrl.pop();
          }
        }
      ]
    });
    confim.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallescitaPage');
    console.log('Se acualizo la vista');
  }

  ionViewWillEnter(){
    console.log("Se entro a historial marcotas");
    this.cita.actualizarData();
   }

}
