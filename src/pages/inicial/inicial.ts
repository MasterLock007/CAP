import { UsersserviceProvider } from './../../providers/usersservice/usersservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import * as firebase from 'firebase';

/**
 * Generated class for the InicialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicial',
  templateUrl: 'inicial.html',
})
export class InicialPage {
  rfc: firebase.database.Reference;
  Usus = [];
  emisor: any
  receptor: any
  Uemisor: any
  Ureceptor: any
  datosusuario=UsersserviceProvider.userdata;
  paramsChat = {
    emisor: this.datosusuario.nombre,
    receptor: "jxzyel"
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
    this.Uemisor=this.datosusuario.nombre;
    this.rfc = firebase.database().ref().child("users");
    this.rfc.on("value", (snap) => {
      var data = snap.val();
      for (var key in data) {
          console.log(data[key].nombre);
          this.Usus.push(data[key]);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicialPage');
  }

  abrirChat(){
    console.log(this.Ureceptor);
    
    if(this.Ureceptor != undefined){
      this.paramsChat.emisor = this.Uemisor;
      this.paramsChat.receptor = this.Ureceptor
      this.navCtrl.push(ChatPage, this.paramsChat);
    }else{
      let alert=this.alertCtrl.create({
        title:"Error",
        message:"No se ha elegido un usuario para chatear",
        buttons:[
          {
            text: "Aceptar",
            handler:()=>{
            }
          }
        ]
      });
      alert.present();
    }
   
  }

}
