import { UsersserviceProvider } from './../../providers/usersservice/usersservice';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { UsuariovePage } from '../usuariove/usuariove';
import { UsuariovePageModule } from '../usuariove/usuariove.module';
import { HistorialPage } from '../historial/historial';

/**
 * Generated class for the AltaveterinarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-altaveterinario',
  templateUrl: 'altaveterinario.html',
})
export class AltaveterinarioPage {


  refVeterinario: firebase.database.Reference;
  mandaSnapU: firebase.database.DataSnapshot;
  mandaSnapV: firebase.database.DataSnapshot;
  refVeteUsua: any;
  keyUsuarios: string;
  refusuarios: firebase.database.Reference;
  indice: any;
  refeDatosVete: firebase.database.Reference;
  keySS: string;
  key: any;
  data: any;
  llaves=[];
  usuarios: any[];
  referecia: firebase.database.Reference;
  myForm: FormGroup;
  uid=UsersserviceProvider.userUID;
  estado=UsersserviceProvider.userdata.estado;
  
  constructor(public alertCtrl: AlertController, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.myForm = this.createMyForm();
   // this.getVeterinarios();
    this.getUsuarios();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaveterinarioPage');
  }


  enviarDatosVeter(i) {
    //se asigno el veterianrio al usuario                      
    this.refeDatosVete = firebase.database().ref().child("users/"+this.uid+"/veterinarios/"+this.llaves[i]);
    this.refeDatosVete.set(true);
    //enviar datos del usuario al veterinario
    this.refVeteUsua = firebase.database().ref().child("users/" + this.llaves[i] + "/pacientes/"+this.uid);
    this.refVeteUsua.set(true);
  }

  encuentraID() {
    this.indice;
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.myForm.value.veterinario == this.usuarios[i].nombre) {
        this.indice = i;
        this.enviarDatosVeter(i);
        break;
      }
    }
  }


  elegido() {
    this.encuentraID();
    let alert = this.alertCtrl.create({
      title: 'Asiganción exitosa!',
      subTitle: 'haz sido asignado al veterinario <br>' +
        this.myForm.value.veterinario,
      buttons: ['Aceptar']
    });
    alert.present();
  }


  saveData() {
    this.navCtrl.pop(); //manda a home sin la flecha de arriba para regresar
    this.myForm.reset(); //LIMPIA LOS CAMPOS DEL FORMULARIO
  }



  private createMyForm() {  //VALIDA QUE EL FORMULARIO ESTE VALIDADO Y ASI SE PUEDA
    return this.formBuilder.group({
      veterinario: ['', Validators.required],

    });
  }
/*
  getVeterinarios() {
    this.refVeterinario = firebase.database().ref().child("veterinario");
    this.refVeterinario.on("value", (snap) => {
      this.data = snap.val();
      this.veterinarios = [];
      for (this.key in this.data) {
        this.veterinarios.push(this.data[this.key]);
      }
      // this.keyUsuarios = Object.keys(this.mandaSnap.val())[this.indice]
      // console.log(ke);
      console.log(this.veterinarios);

    });
  }*/
//  this.keySS = Object.keys(this.mandaSnapV.val())[this.indice]
     

  getUsuarios() { //Se debe de obtener el veterinario para poder mandar sus datos al usuario y los del usuario al veterinario y aparezcan en tu pantalla 
    //con los divs que pusiste  y sus mascotas
    this.refusuarios = firebase.database().ref().child("users");
    this.refusuarios.orderByChild("estado").equalTo(this.estado).once("value", (snap) => {
      this.data = snap.val();
      this.usuarios = [];
      this.mandaSnapU = snap;
      for (this.key in this.data) {
        if(this.data[this.key].tipo_usuario=='V'){
          this.usuarios.push(this.data[this.key]);
          this.llaves.push(this.key);
        }
      }
      // this.keyUsuarios = Object.keys(this.mandaSnap.val())[this.indice]
      // console.log(ke);
      console.log(this.usuarios);

    });
  }
}
