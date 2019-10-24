import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MartesPage } from './martes';

@NgModule({
  declarations: [
    MartesPage,
  ],
  imports: [
    IonicPageModule.forChild(MartesPage),
  ],
})
export class MartesPageModule {}
