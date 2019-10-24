import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import * as firebase from "firebase";
import { User } from "../../interfaces/user";


@Injectable()
export class UsersserviceProvider {
  public data: any;
  user: User;
  public fireAuth: any;
  public userProfile: any;
  public static userdata: any;
  public static userUID:any;
  public static oldPass: string;
  public static b: boolean;

  b = false;

  constructor(public http: Http) {
    this.fireAuth = firebase.auth() ;


    this.userProfile = firebase.database().ref("users");





  }

  async loginUserService(user:User){
    //Iniciando sesion

    return this.fireAuth.signInWithEmailAndPassword(user.email, user.contrasena);
  }

  signupUserService(account: {}) {
    //Creacion del usuario
    return this.fireAuth
      .createUserWithEmailAndPassword(account["email"], account["contrasena"])
      .then(newUser => {
        //Iniciando sesion
        this.fireAuth
          .signInWithEmailAndPassword(account["email"], account["contrasena"])
          .then(authenticatedUser => {
            //Inicio de sesión existoso, guardando vector con datos del user
            this.userProfile.child(authenticatedUser.uid).set(account);
          });
      });
  }

  cerrarSesion() {
    this.fireAuth.signOut();
  }


  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
        this.fireAuth.auth.currentUser.updateProfile({
            displayName: this.fireAuth.auth.currentUser.displayName,
            photoURL: imageurl
        }).then(() => {
            firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
            displayName: this.fireAuth.auth.currentUser.displayName,
            photoURL: imageurl,
            uid: firebase.auth().currentUser.uid
            }).then(() => {
                resolve({ success: true });
                }).catch((err) => {
                    reject(err);
                })
        }).catch((err) => {
              reject(err);
           })
    })
    return promise;
}


  resetearContrasena(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
      /*.then(function() {
        //Exito
      })
      .catch(function(error) {
        // Un error ocurrio
      });*/
  }

}
