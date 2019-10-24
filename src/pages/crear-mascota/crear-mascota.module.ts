import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearMascotaPage } from './crear-mascota';

@NgModule({
  declarations: [
    CrearMascotaPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearMascotaPage),
  ],
})
export class CrearMascotaPageModule {}
