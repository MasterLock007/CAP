import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DomingoPage } from './domingo';

@NgModule({
  declarations: [
    DomingoPage,
  ],
  imports: [
    IonicPageModule.forChild(DomingoPage),
  ],
})
export class DomingoPageModule {}
