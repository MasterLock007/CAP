
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform,ToastController } from 'ionic-angular';


import { File } from '@ionic-native/file';
 import pdfMake from 'pdfmake/build/pdfmake';
 import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from '@ionic-native/file-opener';



pdfMake.vfs=pdfFonts.pdfMake.vfs;



/**
 * Generated class for the UsuariovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuariove',
  templateUrl: 'usuariove.html',
})
export class UsuariovePage {


  qrData = null;
  place=null;
  createdCode=null;


  letterObj={
    de:'',
    para:'',
    mensaje : ''
  }

  pdfObj = null;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private file: File,
    private pl: Platform,
    private fileOpen: FileOpener
    ) {


  }



  openLocalPdf(){

    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const imageData = canvas.toDataURL("image/jpeg").toString();
    console.log(imageData);
    var docDefinition = {
      content:[

        {text: 'HYS Asociados' ,style: 'header',alignment:'right'},
        {text: new Date().toTimeString(),alignment:'right',style:'subheader'},
        {text: 'Bienvenidos' ,style: 'welcome',alignment:'center'},
        {text: 'De' ,style:'subheader'},
        {text: this.letterObj.de},
        {text: 'Para' ,style:'subheader'},
          this.letterObj.para,
        {text: this.letterObj.mensaje,style:'story',margin:[0,20,0,20]},
        {image : imageData, fit: [200, 200],alignment:'center'},
      ],
      styles:{

        header:{
          fontSize:18,
          bold:true
        },
        subheader:{
          fontSize:14,
          bold:true,
          margin:[0,15,0,0]
        },
        welcome:{
          fontSize:20,
          bold:true,
          margin:[0,20,0,0],
          color:'red',
        },
        story:{
          italic:true,
          alignment:'center',
          width:'50%',
        }

      }

    }

    //creacion de pdf

    this.pdfObj = pdfMake.createPdf(docDefinition);

  }

  downloadAndOpenPdf(){

    if (this.pl.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var utf8 = new Uint8Array(buffer);
        var binaryArray = utf8.buffer;
        var blob = new Blob([binaryArray],{type:'application/pdf'});
        this.file.writeFile(this.file.dataDirectory,'miDocumento.pdf',blob,{replace:true}).then(() =>{
          this.fileOpen.open(this.file.dataDirectory + 'miDocumento.pdf','application/pdf');
        })
      });


      console.log("soy un dispositivo");
    }else{
      this.pdfObj.download();
    }

  }

}




