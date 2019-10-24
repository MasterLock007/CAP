import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { NotesService } from '../../services/Notes.services';

/**
 * Generated class for the IncidenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incidencia',
  templateUrl: 'incidencia.html',
})
export class IncidenciaPage {

  public tipoIncidencia: string;
  public motivo: string ;
  public coordinador: string;
  public planta: string;
  public fechaInc: string;
  public horaIni: string;
  public horaFin: string;
  public totalHoras: number;
  public repetirContra: string;
  public status: 0;
  datosusuario = UsersserviceProvider.userdata;

  constructor(public navCtrl: NavController, public navParams: NavParams,private NotesService: NotesService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncidenciaPage');
  }

  doIncidencia(){
    var incidencia ={
      tipoIncidencia: this.tipoIncidencia,
      motivo: this.motivo,
      coordinador: this.coordinador,
      planta: this.planta,
      fechaInc: this.fechaInc,
      horaIni: this.horaIni,
      horaFin: this.horaFin,
      totalHoras: this.totalHoras,
      status: this.status=0,
      nombre: this.datosusuario.nombre+' '+this.datosusuario.aPaterno+' '+this.datosusuario.aMaterno,
    }

    this.NotesService.crearIncidencia(incidencia);

    console.log(incidencia);
  }

}
