import { UsersserviceProvider } from './../../providers/usersservice/usersservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Usuario } from '../../clases/Usuario';
/**
 * Generated class for the AgregarusuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregarusuario',
  templateUrl: 'agregarusuario.html',
})
export class AgregarusuarioPage {
  usuarios=[];
  usuario:Usuario;
  uid=UsersserviceProvider.userUID;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getUsuarios();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarusuarioPage');
  }

  getUsuarios() {
    var referencia = firebase.database().ref().child("users");
    referencia.orderByChild("tipo_usuario").equalTo("U").on("value", (snap) => {
      var data= snap.val();
      var pacientes= this.getpacientes();
      var key;
      var i=0;
      var guardar=true;
      this.usuarios = [];
      for (key in data) {
        guardar=true;
        if(i<pacientes.length){
          if(pacientes[i]==key){
            i++;
            guardar=false;
          }
        }
        if(guardar){
          var usuario=new Usuario(data[key],key);
          this.usuarios.push(usuario);
        }
      }
     console.log(this.usuarios);
    });
  }
  getpacientes(){
    var pacientes=[];
    var key;
    var refEnVeterinario=firebase.database().ref().child("users/"+this.uid+"/pacientes");
    refEnVeterinario.orderByKey().once("value",(snap)=>{
      for(key in snap.val()){
        pacientes.push(key);
      }
    });
    return pacientes;
  }
  agregarPacientes(usuario:Usuario){
    this.usuario=usuario;
    var referencia=firebase.database().ref().child("users/"+this.uid+"/pacientes/"+usuario.key);
    referencia.set(true);
    var referencia2=firebase.database().ref().child("users/"+usuario.key+"/veterinarios/"+this.uid);
    referencia2.set(true);
    this.navCtrl.pop();
  }
}
