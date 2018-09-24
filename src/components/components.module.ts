import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UniHeaderComponent } from './uni-header/uni-header';
import { UniFastlinkComponent } from './uni-fastlink/uni-fastlink';
import { UniAlertchartComponent } from './uni-alertchart/uni-alertchart';
import { UniRankchartComponent } from './uni-rankchart/uni-rankchart';

@NgModule({
	declarations: [UniHeaderComponent,
    UniFastlinkComponent,
    UniAlertchartComponent,
    UniRankchartComponent],
	imports: [IonicPageModule],
	exports: [UniHeaderComponent,
    UniFastlinkComponent,
    UniAlertchartComponent,
    UniRankchartComponent]
})
export class ComponentsModule {}
