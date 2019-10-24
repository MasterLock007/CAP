import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { FormBuilder } from '@angular/forms';

import { AngularFireDatabase } from 'angularfire2/database';
import { NotesService } from '../../services/Notes.services';
import { CrearMascotaPage } from '../crear-mascota/crear-mascota';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { GaleriaPage } from '../galeria/galeria';

/**
 * Generated class for the MascotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mascota',
  templateUrl: 'mascota.html',
})
export class MascotaPage {

  //Para subir imagenes
  hayMas: boolean = true;
  titulo: string = "";
  imagenPreview: string = "";
  imagen64: string;
  foto = 'https://firebasestorage.googleapis.com/v0/b/xoli-d8ebf.appspot.com/o/fotos%2Fmascota-default.png?alt=media&token=66a45ca0-5c43-4d5e-94ca-d76c731a7890';

  uid = UsersserviceProvider.userUID;
  //
id = null;
  mascota: any;


  mascotas = [];
  //mascotas: Observable<any[]>
  constructor(public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public notesServices: NotesService,
    
  ){

  
    // declaramos una Array 'mascotas' y en el recibimos el Array de mascotas de NotesService
    //ASI SE USA SUBSCRIBE() Y JALAMOS INFO DE FIREBASE
/*
    firebase.database().ref().child('mascotas/' + this.data.mascota).once('value',(snap)=>
  {
    this.mascota=snap.val();
  })

  console.log('mascota' + this.mascota);  */
    notesServices.GetMascotas().subscribe(mascotas => {
      this.mascotas = mascotas;

    });

  }



  details(id) {
    /*  //vamos a la vista de detail ademas de enviar parametros como el 'id'
    esto le manda a DetailPage el id de la nota y ver solo 
    la informacion de esa nota en particular */
    this.navCtrl.push(CrearMascotaPage, { id: id });
  }

  /*
    borrarM(mascota) {
      this.notesServices.GetMascotas().subscribe(mascotas =>{
        this.mascotas = mascotas;})
      this.notesServices.borrarMascota({mascotas: mascota});
      alert("Eliminado con exito");
      this.navCtrl.pop();
    }
  */
/*
  getFoto()
  {
    firebase.storage().ref().child('fotos/'+this.uid+'/'+ this.mascota+'.png').getDownloadURL().then(
      (url)=>{
        this.mascotaFoto = url;
      }
    )
  }
*/
  irGaleria()
  {
    this.navCtrl.push(GaleriaPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MascotaPage');
  }

  getMascota()
  {
    return this.afDB.list('mascotas/'+this.uid).valueChanges();
  }

}
