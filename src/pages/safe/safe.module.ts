import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SafePage } from './safe';

@NgModule({
  declarations: [
    SafePage,
  ],
  imports: [
    IonicPageModule.forChild(SafePage),
  ],
})
export class SafePageModule {}
