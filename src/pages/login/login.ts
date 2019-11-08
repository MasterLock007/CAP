import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  AlertController,
  MenuController
} from "ionic-angular";
 import { UsersserviceProvider } from "../../providers/usersservice/usersservice";
import { OlvidoContrasenaPage } from "../olvido-contrasena/olvido-contrasena";
import { HomePage } from "../home/home";
import { User } from "../../interfaces/user";
import { SignupPage } from "../signup/signup";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
  providers: [UsersserviceProvider]
})
export class LoginPage {
  user = {} as User;
  public acceso: boolean;
  public contraseana:string;
  //public static oldpass: string;

  constructor(
    public usersService: UsersserviceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public menu: MenuController
  ) {
    this.menu.enable(false);

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");

  }

  mostrarAlerta(msj1, msj2) {
    let alert = this.alertCtrl.create({
      title: msj1,
      subTitle: msj2,
      buttons: ["OK"]
    });
    alert.present();
  }
  validarCampos() {
    if (
      this.user.email == null ||
      this.user.contrasena == null ||
      this.user.email == "" ||
      this.user.contrasena == ""
    ) {
      this.mostrarAlerta("Error", "Completa todos los campos");
      this.acceso=false;
    } else {
      this.acceso=true;
    }
  }
  submitLogin(user: User) {
    this.validarCampos();

    if (this.acceso) {
      var that = this;
      var loader = this.loadingCtrl.create({
        content: "Iniciando sesión..."
      });
      loader.present();

      this.usersService.loginUserService(this.user).then(

        authData => {
          //successful
          UsersserviceProvider.oldPass=that.user.contrasena;
          that.navCtrl.setRoot(HomePage,that.user);

          loader.dismiss();

        },
        error => {
          loader.dismiss();
          // Unable to log in
          let toast = this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: "top"
          });
          toast.present();

          that.user.contrasena = ""; //empty the password field
        }
      );

    }
  }

  olvidoContrasena() {
    this.navCtrl.push(OlvidoContrasenaPage);
  }

  usuario(){
    this.navCtrl.push(SignupPage);
  }
}
