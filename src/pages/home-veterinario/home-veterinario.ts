import { Component } from '@angular/core';
import { MenuController,NavController, NavParams } from 'ionic-angular';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { HistorialPage } from '../historial/historial';
import { UsuariovePage } from '../usuariove/usuariove';
import { FirmarsePage } from '../firmarse/firmarse';
import { PerfilPage } from '../perfil/perfil';

@Component({
  selector: 'page-home-veterinario',
  templateUrl: 'home-veterinario.html',
  providers: [UsersserviceProvider]
})

export class HomeVeterinarioPage {

  tab1Root = HistorialPage;
  tab2Root = UsuariovePage;
  tab3Root = FirmarsePage;
  tab4Root = PerfilPage;
  constructor(public menuCtrl: MenuController,public usersserviceProvider: UsersserviceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(false);
  }



}




