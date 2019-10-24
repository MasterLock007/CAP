import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ToastController, AlertController } from 'ionic-angular';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { LoginPage } from "../login/login";

import {  BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NotesService } from '../../services/Notes.services';
import { AngularFireDatabase } from 'angularfire2/database';
import { SetDay } from '../../clases/SetDay';
import { Geolocation,Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {


  geoAddress: string;
  geoLatitude: number;
  geoLongitude: number;
  uid = UsersserviceProvider.userUID;
  datosusuario = UsersserviceProvider.userdata;
  scanData : any = {};
  options :BarcodeScannerOptions;
  asistencias:any[];
  asis:any[];
  asistencia: any = {
    id: null,
    nombre: this.datosusuario.nombre+' '+this.datosusuario.aPaterno,
    empresa:'HyS',
    lugar: 'Metepec',
    hora:null,
    clave:null,
    estatus: 0,
    ubicacion:''
  };
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  constructor(public navParams: NavParams,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              public usersserviceProvider : UsersserviceProvider,
              public navCtrl: NavController,
              public menu: MenuController,
              public toastCtrl: ToastController,
              private barcodeScanner: BarcodeScanner,
              private NotesService: NotesService,
              private alertCtrl: AlertController,
              public afDB: AngularFireDatabase) {
      this.menu.enable(true);
      var day= new SetDay;
      var his=day.getDay();
      this.afDB.list("asistencias/"+his+"/"+this.uid+"/").valueChanges().subscribe(asistencias => {
        this.asistencias = asistencias;
      });

      console.log(this.uid);

  }

  ionViewDidLoad() {


    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.geoLatitude = geoposition.coords.latitude;
      this.geoLongitude = geoposition.coords.longitude;
      this.getGeoencoder(this.geoLatitude,this.geoLongitude);
  }).catch((error) => {
    console.log('Error getting location', error);
  });




    const toast = this.toastCtrl.create({
      message: "Bienvenido" + " " + this.datosusuario.nombre,
      duration: 3000
    });
    toast.present();
  }



  getGeoencoder(latitude,longitude){
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result: NativeGeocoderReverseResult[]) => {
      this.geoAddress = this.generateAddress(result[0]);
    })
    .catch((error: any) => {
      alert('Error getting location'+ JSON.stringify(error));
    });
  }

  //Return Comma saperated address
  generateAddress(addressObj){
      let obj = [];
      let address = "";
      for (let key in addressObj) {
        obj.push(addressObj[key]);
      }
      obj.reverse();
      for (let val in obj) {
        if(obj[val].length)
        address += obj[val]+', ';
      }
    return address.slice(9, -2);
  }

  cerrarSesionUser(){

    this.usersserviceProvider.cerrarSesion();
    this.navCtrl.setRoot(LoginPage);
  }

  scan(){
    this.options = {
        prompt : "Escanea tu código"
    };


    this.barcodeScanner.scan(this.options).then((data) => {
        this.scanData = data;

        if (this.asistencias.length==0) {

          let today = new Date();
          this.asistencia.id= Date();
          this.asistencia.fecha=today.getDate()+'-'+((today.getMonth())+1)+'-'+today.getFullYear();
          this.asistencia.hora=today.toLocaleTimeString();
          this.asistencia.clave=this.scanData.text.split(",")[2];
          this.asistencia.lugar=this.scanData.text.split(",")[1];
          this.asistencia.empresa=this.scanData.text.split(",")[0];
          this.asistencia.ubicacion=this.geoAddress;
          this.NotesService.crearAsistencia(this.asistencia);
         this.mostrarAlerta("Listo!","Te firmaste con éxito");

         }else{

          if (this.asistencias.pop().estatus==0) {
            this.asistencia.estatus=1;
          }else{
            this.asistencia.estatus=0;
          }
          let today = new Date();
          this.asistencia.id= Date();
          this.asistencia.fecha=today.getDate()+'-'+((today.getMonth())+1)+'-'+today.getFullYear();
          this.asistencia.hora=today.toLocaleTimeString();
          this.asistencia.clave=this.scanData.text.split(",")[2];
          this.asistencia.lugar=this.scanData.text.split(",")[1];
          this.asistencia.empresa=this.scanData.text.split(",")[0];
          this.asistencia.ubicacion=this.geoAddress;
          this.NotesService.crearAsistencia(this.asistencia);
         this.mostrarAlerta("Listo!","Te firmaste con éxito");


         }

    }, (err) => {
        console.log("Ocurrio un error: " + err);
    });
}

 altaAsist(){



 if (this.asistencias.length==0) {

  let today = new Date();
  this.asistencia.id= Date();
  this.asistencia.fecha=today.getDate()+'-'+((today.getMonth())+1)+'-'+today.getFullYear();
  this.asistencia.hora=today.toLocaleTimeString();;
  this.NotesService.crearAsistencia(this.asistencia);
 this.mostrarAlerta("Listo!","Te firmaste con éxito");

 }else{

  if (this.asistencias.pop().estatus==0) {
    this.asistencia.estatus=1;
  }else{
    this.asistencia.estatus=0;
  }
  let today = new Date();
  this.asistencia.id= Date();
  this.asistencia.fecha=today.getDate()+'-'+((today.getMonth())+1)+'-'+today.getFullYear();
  this.asistencia.hora=today.toLocaleTimeString();;
  this.NotesService.crearAsistencia(this.asistencia);
 this.mostrarAlerta("Listo!","Te firmaste con éxito");


 }


 }

 mostrarAlerta(msj1, msj2) {
  let alert = this.alertCtrl.create({
    title: msj1,
    subTitle: msj2,
    buttons: ["Ok"]
  });
  alert.present();
}

}
