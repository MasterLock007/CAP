import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LunesPage } from './lunes';

@NgModule({
  declarations: [
    LunesPage,
  ],
  imports: [
    IonicPageModule.forChild(LunesPage),
  ],
})
export class LunesPageModule {}
