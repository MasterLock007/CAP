import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { User } from '../../interfaces/user';
import * as firebase from "firebase";
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';


/**
 * Generated class for the CambioContrasenaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cambio-contrasena',
  templateUrl: 'cambio-contrasena.html',
})
export class CambioContrasenaPage {
  datosusuario = UsersserviceProvider.userdata;

  uid = UsersserviceProvider.userUID;
  public contrasena: string = UsersserviceProvider.oldPass;
  public b = UsersserviceProvider.b;

  user = {} as User;
  public oldpass: string;
  public nuevaPass: string;
  public nuevaPass2: string;
  public bandera: boolean;
  public a: boolean;


  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambioContrasenaPage');

  }

  atras() {
    this.navCtrl.pop();
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
    if ((this.nuevaPass.localeCompare(this.nuevaPass2)) != 0) {
      this.mostrarAlerta(
        "Error",
        "Las contraseñas nuevas no coinciden"
      );
      this.bandera = false;
    } else {
      this.bandera = true;
    }
  }

  actualizar(user: User) {
    var that = this;
    let email = this.datosusuario.email;
    let password1 = this.datosusuario.contrasena;

    if(this.b == false)
    {





    console.log(password1 + "");
    var users = firebase.auth().currentUser;
    console.log("Contraseña: " + this.contrasena);

    this.validarCampos();
    if (this.contrasena == this.oldpass) {
      if (this.bandera) {
        firebase
          .database()
          .ref('users/' + this.uid + '/contrasena/').set(this.nuevaPass);
        users
          .updatePassword(that.nuevaPass)
          .then(function () {
            const toast = that.toastCtrl.create({
              message: "Contraseña Actualizada Correctamente",
              duration: 3000
            });
            toast.present();
          })
          .catch(function (error) {
            const toast = that.toastCtrl.create({
              message: "Error",
              duration: 3000
            });
            toast.present();
          });
          this.b= true;
          this.navCtrl.pop();
      }else{
      }
    }else{
      this.mostrarAlerta("Error","Tu contraseña actual no coincide con la de tu cuenta");
    }
/*
    if (password1 == this.oldpass) {
      console.log("Password correcto!");

      var users = firebase.auth().currentUser;
      firebase
        .database()
        .ref('users/' + this.uid + '/contrasena/').set(this.nuevaPass);
      users
        .updatePassword(that.nuevaPass)
        .then(function () {
          const toast = that.toastCtrl.create({
            message: "Contraseña Actualizada Correctamente",
            duration: 3000
          });
          toast.present();


        })
        .catch(function (error) {
          const toast = that.toastCtrl.create({
            message: "Error",
            duration: 3000
          });
          toast.present();
        });
    } else {
      const toast = that.toastCtrl.create({
        message: "Contraseña Actual Incorrecta",
        duration: 3000
      });
      toast.present();
    }
*/

  } else
  {

    console.log(password1 + "");

    var users = firebase.auth().currentUser;

    console.log("Contraseña: " + this.contrasena);

    this.validarCampos();

    if (this.datosusuario.contrasena == this.oldpass) {
      if (this.bandera) {
        firebase
          .database()
          .ref('users/' + this.uid + '/contrasena/').set(this.nuevaPass);
        users
          .updatePassword(that.nuevaPass)
          .then(function () {
            const toast = that.toastCtrl.create({
              message: "Contraseña Actualizada Correctamente",
              duration: 3000
            });
            toast.present();
          })
          .catch(function (error) {
            const toast = that.toastCtrl.create({
              message: "Error",
              duration: 3000
            });
            toast.present();
          });
          this.b= true;
          this.navCtrl.pop();
      }else{
      }
    }else{
      this.mostrarAlerta("Error","Tu contraseña actual no coincide con la de tu cuenta");
    }
/*
    if (password1 == this.oldpass) {
      console.log("Password correcto!");

      var users = firebase.auth().currentUser;
      firebase
        .database()
        .ref('users/' + this.uid + '/contrasena/').set(this.nuevaPass);
      users
        .updatePassword(that.nuevaPass)
        .then(function () {
          const toast = that.toastCtrl.create({
            message: "Contraseña Actualizada Correctamente",
            duration: 3000
          });
          toast.present();


        })
        .catch(function (error) {
          const toast = that.toastCtrl.create({
            message: "Error",
            duration: 3000
          });
          toast.present();
        });
    } else {
      const toast = that.toastCtrl.create({
        message: "Contraseña Actual Incorrecta",
        duration: 3000
      });
      toast.present();
    }
*/
  }
}


}
