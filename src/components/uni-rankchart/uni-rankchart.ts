import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

import * as echarts from 'echarts/dist/echarts.min';

/**
 * Generated class for the UniRankchartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'uni-rankchart',
  templateUrl: 'uni-rankchart.html'
})
export class UniRankchartComponent {

  @Input()
  registed:boolean = false;

  _d = [];

  @Input()
  set datas(v){
    this._d = v;
    if(v.length == 2){
        setTimeout(()=>{
            if(this.registed){
                this.initChart();
            }
        }, 1000);
    }
  }
  get datas(){
      return this._d;
  }

  constructor(private modalCtrl:ModalController) {
    
  }

  goBind(){
    const modal = this.modalCtrl.create('BindMacPage');
    modal.present();
  }

  initChart(){
    let mychart = echarts.init(document.getElementById('barrank'));
    let option = {
        color: ['#3398DB'],
        grid: {
            left: '3%',
            right: '4%',
            top: '3%',
            bottom: '0%',
            containLabel: true
        },
        yAxis : [
            {
                type : 'category',
                data : this._d[0],//['192.168.1.108', '192.168.1.107', '192.168.1.106', '192.168.1.105', '192.168.1.104', '192.168.1.103', '192.168.1.102'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        xAxis : [
            {
                type : 'value',
                splitLine: {show: false},
                axisLine: {show: false},
                axisLabel: {show: false},
                axisTick: {show: false}
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                data:this._d[1],//[700,600,500,400,300,200,100],
                itemStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 1, 0,
                          [
                              {offset: 0, color: '#FF0A96'},
                              {offset: 1, color: '#FF8046'}
                          ]
                      )
                  }
              },
            }
        ]
    };
    mychart.setOption(option);
  }

}
