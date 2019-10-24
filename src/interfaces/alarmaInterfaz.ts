import { Cita } from './../clases/Cita';
export interface Alarma{
    cita:Cita;
    time:number;
    notificado:boolean;
}