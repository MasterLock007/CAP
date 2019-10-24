import { Component, ViewChild,  } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform  } from 'ionic-angular';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import * as firebase from 'firebase';
import { ChatPage } from '../chat/chat';

import { AngularFireDatabase } from 'angularfire2/database';
import { NotesService } from '../../services/Notes.services';
import { Mascota } from '../../clases/Mascota';
/**
 * Generated class for the CruzaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-cruza',
  templateUrl: 'cruza.html',
})
export class CruzaPage {
  @ViewChild(Nav) nav: NavController;
  mascota ={
    raza: "coli",
    sexo:'Macho'
    
  };
  
  uid = UsersserviceProvider.userUID;
  rfc: firebase.database.Reference;
 nombre: any
 usus=[];
 mascotas = [];
 
  usuariosdata = UsersserviceProvider.userdata;
  usuarios={
    nombre: this.usuariosdata.nombre

  };

  constructor(    public afDB: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,
    public notesServices: NotesService) {
   
    this.usuariosdata = UsersserviceProvider.userdata;
    this.usuarios={
      nombre: this.usuariosdata.nombre
      
  
    };
    this.rfc = firebase.database().ref().child("users");
    this.rfc.orderByChild("tipo_usuario").equalTo('U').on("value", (snap) => {
      var data = snap.val();

      for (var key in data) {
          console.log(data[key].nombre);

          if(this.usuarios.nombre == data[key].nombre){
            
          }else{
            this.usus.push(data[key]);
          }
      }
    });
    this.getMascota();

    notesServices.GetMascotas().subscribe(mascotas => {
      this.mascotas = mascotas;

    });
  }

  paramsChat = {
    emisor: this.usuarios.nombre,
    receptor: "jxzyel"
  };
  irChat(pos){
      console.log(this.usus[pos].nombre);
      console.log(this.usuarios.nombre);
    this.paramsChat.receptor = this.usus[pos].nombre
    this.navCtrl.push(ChatPage, this.paramsChat);
      // this.navCtrl.push(InicialPage,{posi:pos});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CruzaPage');
  }

  getMascota(){
    var referencia=firebase.database().ref().child("mascotas/"+this.uid);
    referencia.on("value",(snap)=>{
        this.mascotas=[];
        var valor=snap.val();
        for(var key in valor){
            var mascota=new Mascota(valor[key],key);
            this.mascotas.push(mascota);
        }
        console.log(this.mascotas);
    });
}
}
