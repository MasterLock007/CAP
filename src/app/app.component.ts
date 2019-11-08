
import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, ToastController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { DataServiceProvider } from '../providers/data-service/data-service';
import { NotificacionesProvider } from './../providers/notificaciones/notificaciones';
import { PerfilPage } from "../pages/perfil/perfil";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import * as firebase from "firebase";
import { HomeAdministradorPage } from "../pages/home-administrador/home-administrador";
import { UsersserviceProvider } from "../providers/usersservice/usersservice";
import { CambioContrasenaPage } from '../pages/cambio-contrasena/cambio-contrasena';
import { User } from '../interfaces/user';
import {LunesPage}from '../pages/lunes/lunes';
import { MiercolesPage } from "../pages/miercoles/miercoles";
import { MartesPage } from "../pages/martes/martes";
import { JuevesPage } from "../pages/jueves/jueves";
import { ViernesPage } from "../pages/viernes/viernes";
import { SabadoPage } from "../pages/sabado/sabado";
import { DomingoPage } from "../pages/domingo/domingo";
import { MapaPage } from "../pages/mapa/mapa";
import { IncidenciaPage} from '../pages/incidencia/incidencia';


@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: any;
  user: User;

  showLevel1 = null;
  showLevel2 = null;


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public userService: UsersserviceProvider,
    public dataService: DataServiceProvider,
    public notiService: NotificacionesProvider,
    public toastCtrl: ToastController,


  )
  {

    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        //this.root

        firebase
          .database()
          .ref()
          .child("users/" + user.uid)
          .on("value", snap => {
            var datos = snap.val();
            UsersserviceProvider.userdata = datos;
            UsersserviceProvider.userUID = user.uid;

            if (datos != null) {
              if (datos.tipo_usuario == "V") {

                that.rootPage = HomeAdministradorPage;


              } else {
                that.notiService.iniciar();

                that.nav.setRoot(HomePage,this.user);

              }
            }
          });

        // ...
      } else {
        // User is signed out.
        // ... this.root
        that.rootPage = LoginPage;
      }
    });

    this.dataService.getMenus()
    .subscribe((response)=> {
        this.pages = response;
        console.log(this.pages);
    });



  }



  irPerfil()
  {
    this.nav.push(PerfilPage);
  }
  toIncidencia()
  {
    this.nav.push(IncidenciaPage);
  }

  irCambioContrasena()
  {

    this.nav.push(CambioContrasenaPage);

  }
  irMapa(){
    this.nav.push(MapaPage);
  }
  toMonday()
  {

    this.nav.push(LunesPage);

  }

  toTuesday(){
    this.nav.push(MartesPage);
  }

  toWednesday(){
    this.nav.push(MiercolesPage);
  }

  toThursday(){
    this.nav.push(JuevesPage);
  }

  toFriday(){
    this.nav.push(ViernesPage);
  }
  toSaturday(){
    this.nav.push(SabadoPage);
  }

  toSunday(){
    this.nav.push(DomingoPage);
  }

  cerrarSesionUser(){
    this.userService.cerrarSesion();
    this.nav.push(LoginPage);
  }


  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };

  toggleLevel2(idx) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };

  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  };



}


