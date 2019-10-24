import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroVeterinarioPage } from './registro-veterinario';

@NgModule({
  declarations: [
    RegistroVeterinarioPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroVeterinarioPage),
  ],
})
export class RegistroVeterinarioPageModule {}
