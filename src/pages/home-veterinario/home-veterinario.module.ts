import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeVeterinarioPage } from './home-veterinario';

@NgModule({
  declarations: [
    HomeVeterinarioPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeVeterinarioPage),
  ],
})
export class HomeVeterinarioPageModule {}
