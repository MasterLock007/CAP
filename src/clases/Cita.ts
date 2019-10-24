
import * as firebase from 'firebase';
export class Cita{

    data:any;
    key:any;
    detalles:any;
    usuario:any;
    mascota:any;

    constructor(data,key){
        this.data=data;
        this.key=key;
        this.getDetalles('U');
    }
    getDetalles(tipo:string){
        if(tipo=='U'){
            firebase.database().ref().child("users/"+this.data.veterinario).once('value',(snap)=>{
                this.usuario=snap.val();
                //console.log("detalles cita:"+this.usuario.nombre);
            });
        }else{
            firebase.database().ref().child("users/"+this.data.paciente).once('value',(snap)=>{
                this.usuario=snap.val();
            });
        }
        firebase.database().ref().child("mascotas/"+this.data.paciente+"/"+this.data.mascota).once('value',(snap)=>{
            this.mascota=snap.val();
        });
        this.detalles=true;

    }
    public actualizarData(){
        var referencia=firebase.database().ref().child("citas/"+this.key).once('value',(snap)=>{
            var valor=snap.val();
            this.data=valor;
        });
    }

}
