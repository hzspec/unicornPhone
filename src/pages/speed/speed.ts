import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import * as echarts from 'echarts/dist/echarts.min';

/**
 * Generated class for the SpeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-speed',
  templateUrl: 'speed.html',
})
export class SpeedPage {

    speedType:string = 'equip';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    //setTimeout(()=>{this.initSpeed();}, 1000)
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  initSpeed(){
    let mchart = echarts.init(document.getElementById('speedchart'));
    let option = {
      backgroundColor: '#F2F6FA',
      series: [{
              name: 'CPU使用率',
              type: 'gauge',
              z: 3,
              min: 0,
              max: 100,
              splitNumber: 10,
              radius: '78%',
              axisLine: { // 坐标轴线
                  lineStyle: { // 属性lineStyle控制线条样式
                      width: 0,
                      shadowBlur: 0,
                      color: [
                          [0.2, '#D764FE'],
                          [0.5, '#C45DFE'],
                          [0.7, '#7EDFFF'],
                          [1, '#66FFFF']
                      ]
                  }
              },
              axisTick: { // 坐标轴小标记
                  length: -10, // 属性length控制线长
                  lineStyle: { // 属性lineStyle控制线条样式
                      color: 'auto'
                  },
                  width:2
              },
              axisLabel:{
                show: false
              },
              splitLine: { // 分隔线
                  length: -10, // 属性length控制线长
                  lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                      color: 'auto'
                  }
              },
              pointer: {
                width: 4,
                length:'80%'
              },
              detail: {
                  textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                      color: '#000000',
                      padding: [-190, 0, 0, 0],
                      fontSize:45,
                      fontFamily: "Segoe UI"
                  },
                  formatter: function (value) {
                      return value;
                  },
              },
              title: {
                  offsetCenter: ['0', '33%'],
                  fontSize: 18,
                  color: "#666",
                  show: true
              },
              itemStyle: {
                  normal: {
                      color: "#D764FE",
  
                  }
              },
              data: [{
                  value: 0.00,
                  name: 'Mbps'
              }]
          }
      ]
    }
    mchart.setOption(option);
  }

}
