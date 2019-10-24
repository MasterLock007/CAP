import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import * as firebase from "firebase";


@Injectable()
export class NotesService {
  constructor(public afDB: AngularFireDatabase) {}
 // uid=UsersserviceProvider.userUID;
  uid = firebase.auth().currentUser.uid;


  public GetMascotas() {
    // retorna el Array de objetos de notes a detail.ts
    /* //SE LE PONE VALUECHANGES()
  PARA QUE SE PUEDA USAR SUBCRIBE()
   EN EL CONSTRUCTOR DE USUARIO.TS */
    return this.afDB.list("asistencias/mircoles/"+this.uid+"/").valueChanges();
  }

  public GetMascota(id) {
    return this.afDB.object("mascotas/"+ this.uid +"/" + id).valueChanges();
  }

  public GetFoto(id) {
    return this.afDB.object("fotos/"+ this.uid +"/").valueChanges();
  }

  public crearMascota(mascota) {
    //con esto creamos la nota con todas sus propiedades del obj note
    this.afDB.database.ref("mascotas/"+ this.uid +"/" + mascota.id).set(mascota);
  }

  public crearAsistencia(asistencia) {

    //con esto creamos la asistencia con todas sus propiedades
    let today=new Date();

    switch (today.getDay()) {
      case 0:
      this.afDB.database.ref("asistencias/"+"domingo/"+ this.uid +"/" + asistencia.id).set(asistencia);
      break;
      case 1:
      this.afDB.database.ref("asistencias/"+"lunes/"+ this.uid +"/" + asistencia.id).set(asistencia);
      break;
      case 2:
      this.afDB.database.ref("asistencias/"+"martes/"+ this.uid +"/" + asistencia.id).set(asistencia);
      break;
      case 3:
      this.afDB.database.ref("asistencias/"+"miercoles/"+ this.uid +"/" + asistencia.id).set(asistencia);
      break;
      case 4:
      this.afDB.database.ref("asistencias/"+"jueves/"+ this.uid +"/" + asistencia.id).set(asistencia);
      break;
      case 5:
      this.afDB.database.ref("asistencias/"+"viernes/"+ this.uid +"/" + asistencia.id).set(asistencia);
      break;
      case 6:
      this.afDB.database.ref("asistencias/"+"sabado/"+ this.uid +"/" + asistencia.id).set(asistencia);
      break;
      default:
      this.afDB.database.ref("asistencias/"+ this.uid +"/" + asistencia.id).set(asistencia);
        break;
    }


  }

  public crearIncidencia(incidencia) {
     this.afDB.database.ref("incidencias/"+ this.uid +"/").push(incidencia);

  }

  /*
  editNote(note)-> recibimos la nota que el usuario desea editar
 */
  public editarMascota(mascota) {
    this.afDB.database.ref("mascotas/"+ this.uid +"/" + mascota.id).set(mascota);
  }

  public editarUsuario(cuenta) {
    this.afDB.database.ref("users/"+ this.uid).set(cuenta);
  }

  public borrarMascota(mascota) {
    this.afDB.database.ref("mascotas/"+ this.uid +"/" + mascota.id).remove();
  }
}
