import { MunicipiosModel } from './Municipios-model';
export class EstadosModel{
  
    public id: string;
    public name: string;
    public Municipios:MunicipiosModel[];
    
    constructor(){
        this.id="";
        this.name="";
        this.Municipios=[];
    }
}