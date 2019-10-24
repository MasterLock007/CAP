import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { Camera } from '@ionic-native/camera';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotesService } from '../../services/Notes.services';
import { AngularFireDatabase } from 'angularfire2/database';

import { UsersserviceProvider } from '../../providers/usersservice/usersservice';



@IonicPage()
@Component({
  selector: 'page-crear-mascota',
  templateUrl: 'crear-mascota.html',
})
export class CrearMascotaPage {

 /*   //con esto creamos una nueva nota en blanco
  //cuando estamos en firebase para obtener las propiedades
  del obj se le pone 'any' */
  uid=UsersserviceProvider.userUID;
  myForm: FormGroup;
  image: string = null;
  moveon = true;
  bandera = 0;

  imgurl = firebase.storage().ref('fotos/mascota-default.png');


  mascota: any = {
    id: null,
    nombre: null,
    raza: null,
    sexo: null,
    pedigri: null,
    cruza: null,
    descripcion: null,
    fecha_na: null,
    fecha_m: null,
    foto: null};

  //variable id nula porque va a recibir el id de notesService y navParams directo del obj
  id = null;
  foto = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    afDB: AngularFireDatabase,
    public NotesService: NotesService,
    public fb: FormBuilder,
    public alertCtrl: AlertController,) {

      this.id = navParams.get("id");
      if (this.id != 0) {
        NotesService.GetMascota(this.id).subscribe(mascota => {
          this.mascota = mascota;
        });
      }

      if (this.id != 0) {

      } else {
        this.mascota.id = Date.now();
      }
  }

  takeSelfie()
  {
    this.camera.getPicture({
      quality : 95,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true

    }).then(profilePicture => {
      // Send the picture to Firebase Storage
      this.image = "data:image/png;base64," + profilePicture;
      const selfieRef = firebase.storage().ref('fotos/'+this.uid+'/'+ this.mascota.id+'.png');
      selfieRef
      .putString(profilePicture, 'base64', {contentType: 'image/png'})
      .then(savedProfilePicture => {

        firebase
          .database()
          .ref('mascotas/'+this.uid+'/'+this.mascota.id+'/foto/')
          .set(savedProfilePicture.downloadURL);
      });

    }, error => {
      // Log an error to the console if something goes wrong.
      console.log("ERROR -> " + JSON.stringify(error));
    });

    return this.bandera = 1;
  }



  takeGall(): void
  {
    this.camera.getPicture({
      quality : 95,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit : true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true

    }).then(profilePicture => {
      // Send the picture to Firebase Storage
      this.image = "data:image/png;base64," + profilePicture;
      const selfieRef = firebase.storage().ref('fotos/'+this.uid+'/'+ this.mascota.id+'.png');
      selfieRef
      .putString(profilePicture, 'base64', {contentType: 'image/png'})
      .then(savedProfilePicture => {

        firebase
          .database()
          .ref('mascotas/'+this.uid+'/'+this.mascota.id+'/foto/')
          .set(savedProfilePicture.downloadURL);
      });

    }, error => {
      // Log an error to the console if something goes wrong.
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearMascotaPage');
  }


  editarMascota() {
    /*    //crea el id en base a la fecha en milisegundos
  ya que el titulo y desc se llenan en el detail
    // html pero faltaria un id */
    if(this.mascota.nombre == null ||
      this.mascota.nombre ==  "")
    {
      this.mostrarAlerta("Error", "Falta asignar un nombre");
      return false;
    } else if(this.mascota.raza == null || this.mascota.raza == "")
    {
      this.mostrarAlerta("Error", "Falta asignar especie");
      return false;
    } else if(!this.mascota.fecha_na)
    {
      this.mostrarAlerta("Error", "Falta especificar fecha de Nacimiento o Adopción");
      return false;
    } else if(!this.mascota.sexo)
    {
      this.mostrarAlerta("Error", "Falta especificar sexo");
      return false;
    } if(!this.mascota.pedigri)
    {
      this.mascota.pedigri = false;
    } if(!this.mascota.cruza)
    {
      this.mascota.cruza = false;
    } if(this.mascota.fecha_m == null)
    {
      this.mascota.fecha_m = "false";
    } if(this.mascota.descripcion == null || this.mascota.descripcion == "")
    {
      this.mascota.descripcion = "Sin Descripción."
    }
    {
    if (this.id != 0) {
      //entonces estamos editando
      this.NotesService.editarMascota(this.mascota);
      this.mostrarAlerta("Mascota","Editada con éxito");
    } else {
      //crea una nueva nota con las propiedades que tiene el obj 'mascota' en NotesService
      //this.mascota.id = Date.now();


      this.NotesService.crearMascota(this.mascota);
      this.mostrarAlerta("Mascota","Guardada con éxito");


      this.moveon = false;

    }
    this.navCtrl.pop();
  }}


  borrarM() {

    this.mostrarAlerta("Mascota","Eliminado con éxito");
    //this.navCtrl.push(MascotaPage, this.mascota);
    this.NotesService.borrarMascota(this.mascota);
    this.navCtrl.pop();
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
