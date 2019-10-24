import { MunicipiosModel } from './../../clases/Municipios-model';
import { EstadosMunicipiosProvider } from './../../providers/estados-municipios/estados-municipios';
import { EstadosModel } from './../../clases/Estados-model';
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  LoadingController,
  ToastController,
  NavParams,
  AlertController
} from "ionic-angular";
import { UsersserviceProvider } from "../../providers/usersservice/usersservice";
import { HomePage } from "../home/home";
import { User } from '../../interfaces/user';


@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
  providers: [UsersserviceProvider]
})
export class SignupPage {
  public fecha_aceptacion: string = "" + new Date();
  public nombre: string;
  public aPaterno: string;
  public aMaterno: string;
  public area: string;
  public especialidad: string;
  user = {} as User;
  public telefono: string;
  public pais: string = "México";
  public estado: string;
  public municipio: string;
  public puesto: string;
  public tipoUsuario: string = "U";
  public terminos: boolean;
  public bandera1: boolean;
  public repetirContra: string;

  objDataEstados: EstadosModel[]=[];
  objDataMunicipios: MunicipiosModel[]=[];
  municipiosselect: MunicipiosModel[]=[];
  load: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usersserviceProvider: UsersserviceProvider,
    public estadoMunServicio:EstadosMunicipiosProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private _loadingCtr: LoadingController,

  ) {

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");

   this.getTodosEstados();
  }


  mostrarAlerta(msj1, msj2) {
    let alert = this.alertCtrl.create({
      title: msj1,
      subTitle: msj2,
      buttons: ["OK"]
    });
    alert.present();
  }

  filtrarMunicipios(){

  }

  validarCampos() {
    var terminos = this.terminos;

    if (
      this.nombre == null ||
      this.nombre == "" ||
      this.aPaterno == null ||
      this.aPaterno == "" ||
      this.aMaterno == null ||
      this.aMaterno == "" ||
      this.area == null ||
      this.area == "" ||
      this.especialidad == null ||
      this.especialidad == "" ||
      this.user.email == null ||
      this.user.email == "" ||
      this.telefono == null ||
      this.telefono == "" ||
      this.pais == null ||
      this.pais == "" ||
      this.estado == null ||
      this.estado == "" ||
      this.municipio == null ||
      this.municipio == ""||
      this.puesto == ""||
      this.puesto == null ||
      this.user.contrasena == null ||
      this.user.contrasena == "" ||
      this.repetirContra == null ||
      this.repetirContra == ""
    ) {
      this.mostrarAlerta("Error", "Completa todos los campos");
      this.bandera1 = false;
    } else if (this.telefono.length != 10) {
      this.mostrarAlerta(
        "Error",
        "El número de teléfono debe tener 10 digitos"
      );
      this.bandera1 = false;
    } else if (this.user.contrasena.length < 6 || this.user.contrasena.length > 20) {
      this.mostrarAlerta(
        "Error",
        "La contraseña debe ser de 6 a 20 caracteres"
      );
      this.bandera1 = false;
    } else if (!terminos) {
      this.mostrarAlerta(
        "Error",
        "Debes aceptar los términos y condiciones de uso"
      );
      this.bandera1=false;
    } else if((this.user.contrasena.localeCompare(this.repetirContra))!=0) {
      this.mostrarAlerta(
        "Error",
        "Las contraseñas no coinciden"
      );
      this.bandera1=false;
    }else {
      this.bandera1 = true;
    }
  }

  doSignup() {

    this.validarCampos();
    if (this.bandera1) {
      var account = {
        nombre: this.nombre,
        aPaterno: this.aPaterno,
        aMaterno: this.aMaterno,
        email: this.user.email || "",
        telefono: this.telefono || "",
        estado: this.estado,
        municipio: this.municipio || "",
        area: this.area|| "",
        especialidad: this.especialidad || "",
        puesto: this.puesto || "",
        contrasena: this.user.contrasena || "",
        fecha_aceptacion: this.fecha_aceptacion || "",
        tipo_usuario: this.tipoUsuario || "",
        pais: this.pais || ""
      };
      var that = this;
      //Cuadro de carga
      var loader = this.loadingCtrl.create({
        content: "Cargando..."
      });
      loader.present();

      this.usersserviceProvider.signupUserService(account).then(
        authData => {
          //successful
          loader.dismiss();
          that.navCtrl.setRoot(HomePage);
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






}
