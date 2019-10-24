
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
//Paginas
//Añadan aqui sus paginas
import {FirmarsePage} from "../pages/firmarse/firmarse";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { OlvidoContrasenaPage } from "../pages/olvido-contrasena/olvido-contrasena";
import { HomeVeterinarioPage } from "../pages/home-veterinario/home-veterinario";
import { HistorialPage } from './../pages/historial/historial';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import * as firebase from "firebase";
import { UsersserviceProvider } from "../providers/usersservice/usersservice";
import { UsuariovePage } from '../pages/usuariove/usuariove';
import { EstadosMunicipiosProvider } from '../providers/estados-municipios/estados-municipios';
import { PerfilPage } from '../pages/perfil/perfil';
import { ImagePicker } from '@ionic-native/image-picker';
import { MapaPage } from './../pages/mapa/mapa';
import { CambioContrasenaPage } from "./../pages/cambio-contrasena/cambio-contrasena";
import { AngularFireModule } from "angularfire2";
import {AngularFireDatabaseModule,AngularFireDatabase} from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { NotesService } from '../services/Notes.services';
import { DbProvider } from '../providers/db/db';
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { NotificacionesProvider } from '../providers/notificaciones/notificaciones';
import {LunesPage}from '../pages/lunes/lunes';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { FileOpener } from '@ionic-native/file-opener';
import { MartesPage } from '../pages/martes/martes';
import { MiercolesPage } from '../pages/miercoles/miercoles';
import { JuevesPage } from '../pages/jueves/jueves';
import { ViernesPage } from '../pages/viernes/viernes';
import { SabadoPage } from '../pages/sabado/sabado';
import { DomingoPage } from '../pages/domingo/domingo';
import { UpdateUserPage } from '../pages/update-user/update-user';
import { IncidenciaPage} from '../pages/incidencia/incidencia';





// Initialize Firebase
export const config = {
  apiKey: "AIzaSyBNCFB3bmWNhhEtavyQcwkrpSJaFgyuUf0",
    authDomain: "hysa-3b554.firebaseapp.com",
    databaseURL: "https://hysa-3b554.firebaseio.com",
    projectId: "hysa-3b554",
    storageBucket: "hysa-3b554.appspot.com",
    messagingSenderId: "458967505030"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    OlvidoContrasenaPage,
    HomeVeterinarioPage,
    PerfilPage,
    CambioContrasenaPage,
    FirmarsePage,
    HistorialPage,
    UsuariovePage,
    LunesPage,
    MartesPage,
    MiercolesPage,
    JuevesPage,
    ViernesPage,
    SabadoPage,
    DomingoPage,
    UpdateUserPage,
    MapaPage,
    IncidenciaPage
  ],

  imports: [BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule,
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    OlvidoContrasenaPage,
    HomeVeterinarioPage,
    FirmarsePage,
    PerfilPage,
    CambioContrasenaPage,
    LunesPage,
    MartesPage,
    MiercolesPage,
    JuevesPage,
    ViernesPage,
    SabadoPage,
    DomingoPage,
    HistorialPage,
    UsuariovePage,
    UpdateUserPage,
    MapaPage,
    IncidenciaPage
  ],

  providers: [
    BarcodeScanner,
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    CargaArchivoProvider,
    File,
    FileChooser,
    FilePath,

    //mapa
    Geolocation,
    NativeGeocoder,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FileOpener,
    UsersserviceProvider,
    EstadosMunicipiosProvider,
    AngularFireDatabase,
    NotesService,
    DbProvider,
    LocalNotifications,
    ImghandlerProvider,
    DataServiceProvider,
    NotificacionesProvider,

  ]

})
export class AppModule {


}
