import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { EstadosModel } from '../../clases/Estados-model';
import { MunicipiosModel } from '../../clases/Municipios-model';
import { EstadosMunicipiosProvider } from '../../providers/estados-municipios/estados-municipios';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { NotesService } from '../../services/Notes.services';
import * as firebase from "firebase";

/**
 * Generated class for the UpdateUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-user',
  templateUrl: 'update-user.html',
})
export class UpdateUserPage {

  public area: string;
  public especialidad: string;
  public telefono: string;
  public pais: string = "México";
  public estado: string;
  public municipio: string;
  public puesto: string;
  public bandera1: boolean;
  public email: string;

  objDataEstados: EstadosModel[]=[];
  objDataMunicipios: MunicipiosModel[]=[];
  municipiosselect: MunicipiosModel[]=[];
  load: any;

  datosusuario = UsersserviceProvider.userdata;
  uid = firebase.auth().currentUser.uid;


  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public estadoMunServicio:EstadosMunicipiosProvider,
      public alertCtrl: AlertController,
      private _loadingCtr: LoadingController,
      public NotesService: NotesService,
      public toastCtrl: ToastController
      ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateUserPage');
    this.getTodosEstados();
  }

  validarCampos() {


    if (

      this.area == null ||
      this.especialidad == null ||
      this.especialidad == "" ||
      this.telefono == null ||
      this.telefono == "" ||
      this.puesto == ""||
      this.puesto == null


    ) {
      this.mostrarAlerta("Error", "Completa todos los campos");

    } else if (this.telefono.length != 10) {
      this.mostrarAlerta(
        "Error",
        "El número de teléfono debe tener 10 digitos"
      );
      this.bandera1=false;

    }else{
      this.bandera1=true;
    }

  }

actualizar(){
  this.validarCampos();
  if(this.bandera1){
  var account = {
    nombre: this.datosusuario.nombre,
        aPaterno: this.datosusuario.aPaterno,
        aMaterno:this.datosusuario.aMaterno,
        email: this.datosusuario.email ,
        telefono: this.telefono || "",
        estado: this.datosusuario.estado,
        municipio: this.datosusuario.municipio || "",
        area: this.area|| "",
        especialidad: this.especialidad || "",
        puesto: this.puesto || "",
        contrasena: this.datosusuario.contrasena || "",
        fecha_aceptacion: this.datosusuario.fecha_aceptacion || "",
        tipo_usuario: this.datosusuario.tipo_usuario || "",
        pais: this.datosusuario.pais || ""

  };

  const toast = this.toastCtrl.create({
    message: "Información actualizada correctamente",
    duration: 2000
  });
  toast.present();

  this.NotesService.editarUsuario(account);

  this.navCtrl.pop();
  }
}

cancelar(){
  this.navCtrl.pop();
}

getTodosEstados() {
  this.openLoad('Espere...');
  this.estadoMunServicio.getEstados().subscribe(resultado => this.objDataEstados = resultado,
    (error: Response | any) => {
      this.closeLoad();
      let alert = this.alertCtrl.create({ message: `Error al obtener estados` + error, title: 'Error', buttons: [{ text: 'ok' }] });
      alert.present();
    },
    () => {
      this.estadoMunServicio.getMunicipios().subscribe(result => this.objDataMunicipios = result,
        (error: Response | any) => {
          let alert = this.alertCtrl.create({ message: `Error al obtener municipios` + error, title: 'Error', buttons: [{ text: 'ok' }] });
          alert.present();
        },
        () => {
          this.fitrarMunicipios();
          console.log(this.objDataEstados);
          console.log(this.objDataMunicipios);
          console.log("estados cargados correctamente");

        });

      this.closeLoad();
    });

}

fitrarMunicipios() {
  var imun = 0;
  var iest = 0;
  this.objDataEstados[iest].Municipios=[];
  for (imun = 0; imun < this.objDataMunicipios.length; imun++) {
    if (this.objDataMunicipios[imun].state_id != this.objDataEstados[iest].id) {
      iest++;
      this.objDataEstados[iest].Municipios=[];
    }
    this.objDataEstados[iest].Municipios.push(this.objDataMunicipios[imun]);
  }
  console.log("municipios filtrados");

}

cargarMunicipios() {
  if (this.estado != null && this.estado != "") {
    for (var i = 0; i < this.objDataEstados.length; i++) {
      if (this.objDataEstados[i].name == this.estado) {
        this.municipiosselect = this.objDataEstados[i].Municipios;
      }
    }
  } else {
    this.municipiosselect = [];
  }
  console.log("municipios cargados");
  console.log(this.municipiosselect);


}

openLoad(msg: string) {
  this.load = this._loadingCtr.create({ content: msg });
  this.load.present();
}

closeLoad() {
  this.load.dismiss();
}

mostrarAlerta(msj1, msj2) {
  let alert = this.alertCtrl.create({
    title: msj1,
    subTitle: msj2,
    buttons: ["OK"]
  });
  alert.present();
}

}
