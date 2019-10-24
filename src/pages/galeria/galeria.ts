import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/Notes.services';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';

/**
 * Generated class for the GaleriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {

  uid = UsersserviceProvider.userUID;
  
  id = null;
  
  mascota: any = { 
    id: null, 
    nombre: null, 
    especie: null, 
    raza: null, 
    pedigri: null, 
    descripcion: null,
    fecha_na: null,
    fecha_m: null,
    foto: null};
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public NotesService: NotesService,
    public afDB: AngularFireDatabase) {

      this.id = navParams.get("id");
      if (this.id != 0) {
        NotesService.GetMascota(this.id).subscribe(mascota => {
          this.mascota = mascota;
        });
      }
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaleriaPage');
  }


}
