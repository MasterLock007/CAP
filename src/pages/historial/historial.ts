import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { SetDay } from '../../clases/SetDay';
import { UsersserviceProvider } from "../../providers/usersservice/usersservice";
import * as firebase from 'firebase';

/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-historial",
  templateUrl: "historial.html",
  providers: [UsersserviceProvider]
})
export class HistorialPage {
  asistencias= [];
  asistenciasM=[];

  rfc: firebase.database.Reference;
  constructor(
    public usersserviceProvider: UsersserviceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,

    public afDB: AngularFireDatabase
  ) {
      var day= new SetDay;
      var his=day.getDay();

      this.afDB.list("asistencias/"+his+"/").valueChanges().subscribe(asistencias => {
        //this.asistencias = asistencias;
        for (var key in asistencias) {
          for(var k in asistencias[key]){
            this.asistenciasM.push(asistencias[key][k]);

          }
        }
        this.asistenciasM.reverse();
      });



  }
  getLunes(){
    this.asistencias=[];
    this.rfc = firebase.database().ref().child('asistencias/lunes');
    this.rfc.on("value", (snap) => {
      var data = snap.val();
        for (var key in data) {
          for(var k in data[key]){
            this.asistencias.push(data[key][k]);
            this.asistenciasM.reverse();
          }
        }
    });
    this.asistenciasM=this.asistencias;
  }
  getMartes(){
    this.asistencias=[];
    this.rfc = firebase.database().ref().child('asistencias/martes');
    this.rfc.on("value", (snap) => {
      var data = snap.val();
        for (var key in data) {
          for(var k in data[key]){
            this.asistencias.push(data[key][k]);
            this.asistenciasM.reverse();
          }
        }
    });
    this.asistenciasM=this.asistencias;
  }

  getMiercoles(){
    this.asistencias=[];
    this.rfc = firebase.database().ref().child('asistencias/miercoles');
    this.rfc.on("value", (snap) => {
      var data = snap.val();
      for (var key in data) {
        for(var k in data[key]){
          this.asistencias.push(data[key][k]);
          this.asistenciasM.reverse();
        }
      }
    });

    this.asistenciasM=this.asistencias;

  }

  getJueves(){
    this.asistencias=[];
    this.rfc = firebase.database().ref().child('asistencias/jueves');
    this.rfc.on("value", (snap) => {
      var data = snap.val();
      for (var key in data) {
        for(var k in data[key]){
          this.asistencias.push(data[key][k]);
          this.asistenciasM.reverse();
        }
      }
    });

    this.asistenciasM=this.asistencias;
  }

  getViernes(){
    this.asistencias=[];
    this.rfc = firebase.database().ref().child('asistencias/viernes');
    this.rfc.on("value", (snap) => {
      var data = snap.val();
        for (var key in data) {
          for(var k in data[key]){
            this.asistencias.push(data[key][k]);
            this.asistenciasM.reverse();
          }
        }
    });
    this.asistenciasM=this.asistencias;
  }

  getSabado(){
    this.asistencias=[];
    this.rfc = firebase.database().ref().child('asistencias/sabado');
    this.rfc.on("value", (snap) => {
      var data = snap.val();
        for (var key in data) {
          for(var k in data[key]){
            this.asistencias.push(data[key][k]);
            this.asistenciasM.reverse();
          }
        }
    });
    this.asistenciasM=this.asistencias;
  }

  getDomingo(){
    this.asistencias=[];
    this.rfc = firebase.database().ref().child('asistencias/domingo');
    this.rfc.on("value", (snap) => {
      var data = snap.val();
        for (var key in data) {
          for(var k in data[key]){
            this.asistencias.push(data[key][k]);
            this.asistenciasM.reverse();
          }
        }
    });
    this.asistenciasM=this.asistencias;
  }







}
