import { EstadosModel } from './../../clases/Estados-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MunicipiosModel } from '../../clases/Municipios-model';

@Injectable()
export class EstadosMunicipiosProvider {

  constructor(public http: HttpClient) {
    console.log('Hello EstadosMunicipiosProvider Provider');
  }

  //el link que esta comentado es una API donde tambien se encuentra el archivo json
  //se puede sustituir por la ruta local en caso de ser requerido
  private apiUrl = 'assets/data/estados.json';//'http://datamx.io/dataset/73b08ca8-e955-4ea5-a206-ee618e26f081/resource/9c5e8302-221c-46f2-b9f7-0a93cbe5365b/download/estados.json';
  private apiUrl2= 'assets/data/municipios.json';//http://datamx.io/dataset/319a8368-416c-4fe6-b683-39cf4d58b360/resource/829a7efd-3be9-4948-aa1b-896d1ee12979/download/municipios.json
 
  getEstados(): Observable<EstadosModel[]> {
    return this.http.get<EstadosModel[]>(this.apiUrl);
  }

  getMunicipios(): Observable<MunicipiosModel[]> {
    return this.http.get<MunicipiosModel[]>(this.apiUrl2);
  }
  
}
