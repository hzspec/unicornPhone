import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EquipPage } from './equip';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EquipPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EquipPage),
  ],
})
export class EquipPageModule {}
