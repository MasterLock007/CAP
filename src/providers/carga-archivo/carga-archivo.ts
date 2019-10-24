import { Injectable } from "@angular/core";

import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase";

import "rxjs/add/operator/map";

import { ToastController } from "ionic-angular";


@Injectable()
export class CargaArchivoProvider {
  imagenes: ArchivoSubir[] = [];
  lastKey: string = null;

  constructor(
    public toastCtrl: ToastController,
    public afDB: AngularFireDatabase
  ) {}

  cargar_imagenes() {
    return new Promise((resolve, reject) => {
      this.afDB
        .list("/users", ref =>
          ref
            .limitToLast(3)
            .orderByKey()
            .endAt(this.lastKey)
        )
        .valueChanges()
        .subscribe((posts: any) => {
          posts.pop();

          if (posts.length == 0) {
            console.log("Ya no hay más registros");
            resolve(false);
            return;
          }

          this.lastKey = posts[0].key;

          for (let i = posts.length - 1; i >= 0; i--) {
            let post = posts[i];
            this.imagenes.push(post);
          }

          resolve(true);
        });
    });
  }

  cargar_imagen_firebase(archivo: ArchivoSubir) {
    let promesa = new Promise((resolve, reject) => {
      this.mostrar_toast("Cargando...");

      let storeRef = firebase.storage().ref();
      let nombreArchivo: string = new Date().valueOf().toString(); // 1231231231

      let uploadTask: firebase.storage.UploadTask = storeRef
        .child(`img/${nombreArchivo}`)
        .putString(archivo.img, "base64", { contentType: "image/jpeg" });

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {}, // saber el % de cuantos Mbs se han subido
        error => {
          // manejo de error
          console.log("ERROR EN LA CARGA");
          console.log(JSON.stringify(error));
          this.mostrar_toast(JSON.stringify(error));
          reject();
        },
        () => {
          // TODO BIEN!!
          console.log("Archivo subido");
          this.mostrar_toast("Imagen cargada correctamente");

          let url = uploadTask.snapshot.downloadURL;

          this.crear_post(archivo.titulo, url, nombreArchivo);

          resolve();
        }
      );
    });

    return promesa;
  }

  private crear_post(titulo: string, url: string, nombreArchivo: string) {
    let post: ArchivoSubir = {
      img: url,
      titulo: titulo,
      key: nombreArchivo
    };

    console.log(JSON.stringify(post));

    // this.afDB.list('/post').push(post)
    this.afDB.object(`/users/${nombreArchivo}`).update(post);

    this.imagenes.push(post);
  }

  mostrar_toast(mensaje: string) {
    this.toastCtrl
      .create({
        message: mensaje,
        duration: 2000
      })
      .present();
  }
}

interface ArchivoSubir {
  titulo: string;
  img: string;
  key?: string;
}
