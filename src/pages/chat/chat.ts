import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})


export class ChatPage {

  @ViewChild("content") content: any;
  user: string="";
  message:string="";
  messages=[];
  keys=[];

  emisor: any;
  receptor: any;

  paramsForo = {
    usuarioPub: this.emisor,
  };

  constructor(public alertCtrl:AlertController, navCtrl: NavController,
    public navParams: NavParams) {
    this.emisor = navParams.get("emisor");
    this.receptor = navParams.get("receptor");
    this.getMessages();
  }

  getMessages(){
    var mensajesRef=firebase.database().ref().child("mensajes");
    mensajesRef.on("value",(snap) => {
      var data=snap.val();
      this.messages = [];
      for(var key in data){
        if( (data[key].emisor == this.emisor || data[key].emisor == this.receptor) && (data[key].receptor == this.receptor || data[key].receptor == this.emisor)){
          this.messages.push(data[key]);
          this.keys.push(key);
        }
      }
      // this.scrollToBotton();
    });
  }

  // scrollToBotton(){
  //    var contentend=document.getElementById("Contentend").offsetTop;
  //    this.content.scrollTo(0,contentend,200);
  // }
  sendMessages(){
if (this.message!="") {
  var mensajesRef=firebase.database().ref().child("mensajes");
  mensajesRef.push({mensaje: this.message,emisor: this.emisor,receptor:this.receptor});
  this.message="";
}else{
  let alert=this.alertCtrl.create({
    title:"Error",
    message: "El campo no puede estar vacio",
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

  delMessages(){
    let confim=this.alertCtrl.create({
      title:"Eliminar",
      message:"Desea eliminar todos los mensajes",
      buttons:[
        {
          text: "Cancelar",
          handler:()=>{
            console.log("no")
          }
        },
        {
          text: "Aceptar",
          handler:()=>{
            // console.log("si");
            // var mensajesRef=firebase.database().ref().child("mensajes");
            // mensajesRef.on("value",(snap) => {
            //   var data=snap.val();
            //   var i =  this.messages.length;
            //   var j =  this.messages.length;
              // for(var key in data){
              for(var  i = 0; i< this.keys.length; i++){
                // if((data[key].emisor == this.emisor || data[key].emisor == this.receptor) && (data[key].receptor == this.receptor || data[key].receptor == this.emisor)){
                  console.log(this.keys[i] +" "+i);
                  firebase.database().ref().child("mensajes/"+this.keys[i]).remove();
                //   i--;
                //   if(i < 1){
                //     console.log("break");
                //     break;
                //   }
                // }
              }
            // });
            this.getMessages();
          }
        }
      ]
    });
    confim.present();
  }




  // fpage(){
  //   this.paramsForo.usuarioPub = this.emisor;
  //   this.navCtrl.push(ForoPage, this.paramsForo);
  //   console.log("enviar a for");
  // }

}

