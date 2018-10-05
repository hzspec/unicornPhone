import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UniHeaderComponent } from './uni-header/uni-header';
import { UniFastlinkComponent } from './uni-fastlink/uni-fastlink';
import { UniAlertchartComponent } from './uni-alertchart/uni-alertchart';
import { UniRankchartComponent } from './uni-rankchart/uni-rankchart';
import { TipBindComponent } from './tip-bind/tip-bind';

@NgModule({
	declarations: [UniHeaderComponent,
    UniFastlinkComponent,
    UniAlertchartComponent,
    UniRankchartComponent,
    TipBindComponent],
	imports: [IonicPageModule],
	exports: [UniHeaderComponent,
    UniFastlinkComponent,
    UniAlertchartComponent,
    UniRankchartComponent,
    TipBindComponent]
})
export class ComponentsModule {}
