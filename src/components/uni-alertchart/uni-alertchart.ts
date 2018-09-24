import { Component } from '@angular/core';

import * as echarts from 'echarts/dist/echarts.min';

/**
 * Generated class for the UniAlertchartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'uni-alertchart',
  templateUrl: 'uni-alertchart.html'
})
export class UniAlertchartComponent {

  constructor() {
    setTimeout(()=>{this.initChart();}, 1000);
  }

  initChart(){
    let img = new Image(35, 35);
    img.src = '/assets/imgs/main/alert.png';
    img.onload = ()=>{

      let mychart = echarts.init(document.getElementById('piealert'));
      let option = {
          color: ['#5B5AA6', '#2794CF', '#F05829'],
          legend: {
              x: 'center',
              y: 'bottom',
              itemWidth: 10,
              itemHeight:10,
              itemGap: 3,
              data:['直接访问','邮件营销','联盟广告']
          },
          graphic: [
            {
                type: 'image',
                left: 'center',
                top: 58,
                z: 3,
                style: {
                    image: '/assets/imgs/main/alert.png',
                    width: 35,
                    height: 35
                }
            }
          ],
          series: [
              {
                  name:'访问来源',
                  type:'pie',
                  center: ['50%', 80],
                  radius: ['30%', '65%'],
                  avoidLabelOverlap: true,
                  label: {
                      normal: {
                          show: false,
                          position: 'center'
                      },
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data:[
                      {value:335, name:'直接访问'},
                      {value:310, name:'邮件营销'},
                      {value:234, name:'联盟广告'}
                  ],
                  z:5
              },
              {
                type: 'graph',
                layout: 'none',
                symbolSize: 150,
                top: 0,
                data: [{
                    x: 0,
                    y: 0,
                    itemStyle: {color: '#e0e0e0'}
                }]
              }
          ]
      };
      mychart.setOption(option);
    };
    
  }

}
