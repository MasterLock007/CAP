import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';

/**
 * Generated class for the LunesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lunes',
  templateUrl: 'lunes.html',
  providers: [UsersserviceProvider]
})
export class LunesPage {
  uid = UsersserviceProvider.userUID;
  asistencias:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public afDB: AngularFireDatabase) {
    this.afDB.list("asistencias/lunes/"+this.uid+"/").valueChanges().subscribe(asistencias => {
      this.asistencias = asistencias;


    });
  }

}
