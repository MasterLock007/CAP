import { Mascota } from './Mascota';
import * as firebase from 'firebase';

export class Usuario{
    public data:any;
    public key:string;
    public mascotas=[];
    public mascotasVisibles:boolean;
    constructor(data,key){
        this.key=key;
        this.data=data;
        this.mascotasVisibles=false;
    }
    public getmascotas(){
        var referencia=firebase.database().ref().child("mascotas/"+this.key);
        referencia.on("value",(snap)=>{
            this.mascotas=[];
            var valor=snap.val();
            for(var key in valor){
                var mascota=new Mascota(valor[key],key);
                this.mascotas.push(mascota);
            }
            console.log(this.mascotas);
        });
    }
};