import { Cita } from './../../clases/Cita';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
/**
 * Generated class for the EditarcitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editarcita',
  templateUrl: 'editarcita.html',
})
export class EditarcitaPage {
  myForm: FormGroup;
  mascota:any;
  cita:Cita;
  uid=UsersserviceProvider.userUID;
  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.cita=navParams.get("cita");
    this.myForm=this.createMyForm();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarcitaPage');
  }
  
  saveData() {
    //this.navCtrl.setRoot(HistorialPage); //manda a home sin la flecha de arriba para regresar
    this.navCtrl.pop();//cerrar ventana de agendar citas
    //  this.myForm.reset(); //LIMPIA LOS CAMPOS DEL FORMULARIO
  }

  enviarDatosVeter() {
    console.log('Veterinario'+this.myForm.value.paciente);                             
    console.log('paciente'+this.uid);                             
    var mensajesRef = firebase.database().ref().child("citas/"+this.cita.key);
    mensajesRef.set({
      tipo: this.myForm.value.tipo,
      fecha: this.myForm.value.fecha,
      hora: this.myForm.value.hora,
      motivo: this.myForm.value.motivo,
      veterinario: this.cita.data.veterinario,
      paciente:this.cita.data.paciente,
      mascota:this.cita.data.mascota
    });
  }

  
  private createMyForm() {  //VALIDA QUE EL FORMULARIO ESTE VALIDADO Y ASI SE PUEDA
    return this.formBuilder.group({
      tipo: [this.cita.data.tipo, Validators.required],
       //: ['', Validators.required],
      fecha: [this.cita.data.fecha, Validators.required],
    //  dateEnd: ['', Validators.required],
      hora: [this.cita.data.hora, Validators.required],
     // timeEnd: ['', Validators.required],
      motivo: [this.cita.data.motivo, Validators.required],
    //  invitados: ['', Validators.required]
    });
  }
}
