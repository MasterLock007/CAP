import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
/**
 * Generated class for the MartesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-martes',
  templateUrl: 'martes.html',
  providers: [UsersserviceProvider]
})
export class MartesPage {

  uid = UsersserviceProvider.userUID;
  asistencias:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public afDB: AngularFireDatabase) {
    this.afDB.list("asistencias/martes/"+this.uid+"/").valueChanges().subscribe(asistencias => {
      this.asistencias = asistencias;


    });
  }



}
