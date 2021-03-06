import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import * as echarts from 'echarts/dist/echarts.min';
import * as _ from 'lodash';

/**
 * Generated class for the UniRankchartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'uni-rankchartsafe',
  templateUrl: 'uni-rankchart.html'
})
export class UniRankchartsafeComponent {

  @Input()
  registed:boolean = true;

  _d = [];

  @Input()
  set datas(v){
    this._d = v;

    if(v.length > 0){
        let size = 5;
        let showLabel = false;
        if(v.length == 1){
            size = 15;
            showLabel = true;
        }

        if(this.mapMod){
            let series = [
                {
                    type: 'effectScatter',
                    name: 'l1',
                    coordinateSystem: 'geo',
                    itemStyle: {
                        color: '#488aff'
                    },
                    label: {
                        show: showLabel,
                        align: 'left',
                        formatter: '{@[2]}'
                    },
                    symbolSize: size,
                    data: [],
                    z: 4
                },
                {
                    type: 'effectScatter',
                    name: 'l2',
                    coordinateSystem: 'geo',
                    itemStyle: {
                        color: '#F7DB77'
                    },
                    label: {
                        show: showLabel,
                        align: 'left',
                        formatter: '{@[2]}'
                    },
                    symbolSize: size,
                    data: []
                },
                {
                    type: 'effectScatter',
                    name: 'l3',
                    coordinateSystem: 'geo',
                    itemStyle: {
                        color: '#FF436F'
                    },
                    label: {
                        show: showLabel,
                        align: 'left',
                        formatter: '{@[2]}'
                    },
                    symbolSize: size,
                    data: []
                }
            ];
            for(let vi of v){
                if(vi.type == 'l1'){
                    series[0].data.push(vi);
                }else if(vi.type == 'l2'){
                    series[1].data.push(vi);
                }else if(vi.type == 'l3'){
                    series[2].data.push(vi);
                }
            }
            console.log(series);

            this.mapDatas = series;
            this.mapMod.setOption({series: series});
            console.log('update');
        }else{
            setTimeout(()=>{

                if(this.registed){
                    //this.mapDatas = v;
                    let series = [
                        {
                            type: 'effectScatter',
                            name: 'l1',
                            coordinateSystem: 'geo',
                            itemStyle: {
                                color: '#488aff'
                            },
                            symbolSize: size,
                            data: [],
                            z: 4
                        },
                        {
                            type: 'effectScatter',
                            name: 'l2',
                            coordinateSystem: 'geo',
                            itemStyle: {
                                color: '#F7DB77'
                            },
                            symbolSize: size,
                            data: []
                        },
                        {
                            type: 'effectScatter',
                            name: 'l3',
                            coordinateSystem: 'geo',
                            itemStyle: {
                                color: '#FF436F'
                            },
                            symbolSize: size,
                            data: []
                        }
                    ];
                    for(let vi of v){
                        if(vi.type == 'l1'){
                            series[0].data.push(vi);
                        }else if(vi.type == 'l2'){
                            series[1].data.push(vi);
                        }else if(vi.type == 'l3'){
                            series[2].data.push(vi);
                        }
                    }
                    this.mapDatas = series;
                    this.initMap();
                }
            }, 300);
        }
    }
  }
  get datas(){
      return this._d;
  }

  mapDatas:any = [];
  mapMod:any = null;

  toggleLengend(name){
    this.mapMod.dispatchAction({
        type: 'legendToggleSelect',
        name: name
    });
  }

  constructor(private modalCtrl:ModalController, private http:HttpClient) {
    //this.mapDatas = [{"name":"齐齐哈尔","value":[123.97,47.33,null]},{"name":"盐城","value":[120.13,33.38,null]},{"name":"青岛","value":[120.33,36.07,null]},{"name":"金昌","value":[102.188043,38.520089,null]},{"name":"泉州","value":[118.58,24.93,null]},{"name":"拉萨","value":[91.11,29.97,null]},{"name":"上海浦东","value":[121.48,31.22,null]},{"name":"攀枝花","value":[101.718637,26.582347,null]},{"name":"威海","value":[122.1,37.5,null]},{"name":"承德","value":[117.93,40.97,null]},{"name":"汕尾","value":[115.375279,22.786211,null]},{"name":"克拉玛依","value":[84.77,45.59,null]},{"name":"重庆市","value":[108.384366,30.439702,null]}];
    //for(let m of this.mapDatas){
    //    m.value[2] = Math.random() * 5 + 10;
    //}
  }

  initMap(){
    this.http.get('./assets/data/world.json').toPromise().then((worldJson)=>{
        echarts.registerMap('world', worldJson);
        
        var mapChart = echarts.init(document.getElementById('barrank2'));
        this.mapMod = mapChart;

        var option = {
            backgroundColor: '#fff',
            tooltip : {
                trigger: 'item',
                formatter : function (params) {
                    var value = (params.value);
                    return params.name;
                }
            },
            legend: {
                show: false,
                data: [{
                    name: 'l1'
                },{
                    name: 'l2'
                },{
                    name: 'l3'
                }]
            },
            geo: {
                name: 'IP 地图',
                type: 'map',
                map: 'world',
                //center: [116.97, 39.71],
                zoom: 1.5,
                roam: true,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#B5CBD8',
                        borderColor: 'rgba(255,255,255,0.5)'
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                regions: [{
                    name: 'China',
                    itemStyle: {
                        areaColor: '#D83A3A',
                        color: '#D83A3A'
                    }
                }]
            },
            series : this.mapDatas
        };

        mapChart.setOption(option);

    });
  }

  goBind(){
    const modal = this.modalCtrl.create('BindMacPage');
    modal.present();
  }

  initChart(){
    let mychart = echarts.init(document.getElementById('barrank2'));
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
