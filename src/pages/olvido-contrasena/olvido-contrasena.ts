import { Component } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  ToastController,
  Platform
} from "ionic-angular";

import { LoginPage } from "../login/login";
import { UsersserviceProvider } from "../../providers/usersservice/usersservice";
import { LocalNotifications } from "@ionic-native/local-notifications";

@IonicPage()
@Component({
  selector: "page-olvido-contrasena",
  templateUrl: "olvido-contrasena.html",
  providers: [UsersserviceProvider]
})
export class OlvidoContrasenaPage {
  public email: string;

  public acceso: boolean;


  constructor(
    private localNoti: LocalNotifications,
    private platform: Platform,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public usersService: UsersserviceProvider,
    public afAuth: AngularFireAuth,
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad OlvidoContrasenaPage");
  }

  crearNotificacion(titulo: string, texto: string) {
    this.platform.ready().then(() => {
      this.localNoti.schedule({
        title: titulo,
        text: texto,
        timeoutAfter: 50000
      });
    });
  }

  mostrarAlerta(msj1, msj2) {
    let alert = this.alertCtrl.create({
      title: msj1,
      subTitle: msj2,
      buttons: ["OK"]
    });
    alert.present();
  }
  //Validar email

  validarCampos() {
    if (this.email == null ) {
      this.mostrarAlerta(
        "Error",
        "El campo esta vacio"
      );
      this.acceso = false;
    } else {
      this.acceso = true;
    }
  }

  recuperaContrasena() {

    if (this.email == null || this.email=="" ) {
      this.mostrarAlerta(
        "Error",
        "El campo esta vacio"
      );
      this.acceso = false;
    } else {

      this.afAuth.auth.sendPasswordResetEmail(this.email)
      .then(() => {

        this.mostrarAlerta("Éxito","El correo fue enviado exitosamente");
        this.crearNotificacion("C.A.P","Se envio un correo para restablecer la contraseña");
        this.navCtrl.setRoot(LoginPage);
        //this.navCtrl.pop();
      })
      .catch(err =>  this.mostrarAlerta("Error","El correo no tiene el formato adecuado o no tienes una cuenta en el C.A.P"));

      this.acceso = true;
    }


  }

}
