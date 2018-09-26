import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SafePage } from './safe';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SafePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SafePage),
  ],
})
export class SafePageModule {}
