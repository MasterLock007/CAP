import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MascotaPage } from './mascota';

@NgModule({
  declarations: [
    MascotaPage,
  ],
  imports: [
    IonicPageModule.forChild(MascotaPage),
  ],
})
export class MascotaPageModule {}
