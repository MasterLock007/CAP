import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';

/**
 * Generated class for the MiercolesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-miercoles',
  templateUrl: 'miercoles.html',
  providers: [UsersserviceProvider]
})
export class MiercolesPage {
  uid = UsersserviceProvider.userUID;
  asistencias:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase) {

     this.afDB.list("asistencias/miercoles/"+this.uid+"/").valueChanges().subscribe(asistencias => {
      this.asistencias = asistencias;


    });



  }



}
