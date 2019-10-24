import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {  BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { NotesService } from '../../services/Notes.services';
import { SetDay } from '../../clases/SetDay';
import { AngularFireDatabase } from 'angularfire2/database';
import { Geolocation,Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
/**
 * Generated class for the FirmarsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firmarse',
  templateUrl: 'firmarse.html',
})
export class FirmarsePage {
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private barcodeScanner: BarcodeScanner,private NotesService: NotesService,
    public afDB: AngularFireDatabase ) {
      var day= new SetDay;
      var his=day.getDay();
      this.afDB.list("asistencias/"+his+"/"+this.uid+"/").valueChanges().subscribe(asistencias => {
        this.asistencias = asistencias;
      });

  }

  ionViewDidLoad() {

    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.geoLatitude = geoposition.coords.latitude;
      this.geoLongitude = geoposition.coords.longitude;
      this.getGeoencoder(this.geoLatitude,this.geoLongitude);
  }).catch((error) => {
    console.log('Error getting location', error);
  });


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

mostrarAlerta(msj1, msj2) {
  let alert = this.alertCtrl.create({
    title: msj1,
    subTitle: msj2,
    buttons: ["Ok"]
  });
  alert.present();
}

}
