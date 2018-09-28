import { Component } from '@angular/core';

import * as echarts from 'echarts/dist/echarts.min';

import { Storage } from '@ionic/storage';
import { UserStore } from '../../pages/user.storage';

import * as SockJS from 'sockjs-client/dist/sockjs.min';
import * as Stomp from 'stompjs/lib/stomp.min';
import * as moment from 'moment';

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
export class UniAlertchartComponent  {

  cstime:string = moment().format('YYYY-MM-DD HH:mm:ss');
  cetime:string = moment().format('YYYY-MM-DD HH:mm:ss');
  stompClient:any = null;
  socketInArr:any = [];
  socketOutArr:any = [];
  chartMod:any = null;

  constructor(public store:Storage) {
    
  }

  disConnect(){
    if (this.stompClient != null) {
        this.stompClient.disconnect();
    }
    this.socketInArr = [];
    this.socketOutArr = [];
    if(this.chartMod){
        this.chartMod.dispose();
        this.chartMod = null;
    }
  }

  connect(){
    setTimeout(()=>{
        this.store.get('user').then((us:UserStore)=>{
            this.initSocket(us.apmac);
        });
    }, 1000);
  }

  initSocket(apmac){
    let st:string = this.cstime;//jQuery('#sSTime').val();
    let et:string = this.cetime;//jQuery('#sETime').val();
    st = st.replace(' ', 'T') + '.0Z';
    et = et.replace(' ', 'T') + '.0Z';

    let paramIn:any = {
      "ioFlag": "",
      "createTimeBegin": st,
      "createTimeEnd": et
    };
    let paramOut:any = {
      "ioFlag": "",
      "createTimeBegin": st,
      "createTimeEnd": et
    };
    let url1 = "/ws/ap/ts/";
    let url2 = "/wsx/ap/ts/";

    paramIn = {
        "ioFlag": "IN",
        "createTimeBegin": st,
        "createTimeEnd": et,
        "apMacAddr": apmac
    };
    paramOut = {
        "ioFlag": "OUT",
        "createTimeBegin": st,
        "createTimeEnd": et,
        "apMacAddr": apmac
    };
    url1 = "/ws/ap/ts/" + apmac;
    url2 = "/wsx/ap/ts/" + apmac;
    this.initSocketDetail(apmac, st, et, url1, url2, paramIn, paramOut);
  }

  initSocketDetail(apmac, st, et, url1, url2, pi, po){
    var socket = new SockJS('http://60.205.212.99/dolphin/initWebSocket/');

    this.stompClient = Stomp.Stomp.over(socket);
    this.stompClient.connect({}, (frame) => {
      //IN
      this.stompClient.send(url1 + "IN", {}, JSON.stringify(pi));
      this.stompClient.subscribe(url2 + "IN", (response) => {
        let json = JSON.parse(response.body);
        if(json){
          json.data.forEach(ele1=>{
            this.socketInArr.push([ele1.time, ele1.value]);
          });
          
          if(!this.chartMod){
            this.drawCharts(this.socketInArr, this.socketOutArr);
          }else{
            //this.socketInArr = _.drop(this.socketInArr, json.data.length);
            this.chartMod.setOption({
                series: [{
                    data: this.socketInArr
                },
                {
                    data: this.socketOutArr
                }]
            });
          }
        }
      });
      //OUT
      this.stompClient.send(url1 + "OUT", {}, JSON.stringify(po));
      this.stompClient.subscribe(url2 + 'OUT', (response) => {
        let json = JSON.parse(response.body);
        if(json){
          json.data.forEach(ele1=>{
            this.socketOutArr.push([ele1.time, ele1.value]);
          });
          
          if(!this.chartMod){
            this.drawCharts(this.socketInArr, this.socketOutArr);
          }else{
            //this.socketInArr = _.drop(this.socketInArr, json.data.length);
            this.chartMod.setOption({
                series: [{
                    data: this.socketInArr
                },
                {
                    data: this.socketOutArr
                }]
            });
          }
        }
      });

    });
  }

  drawCharts(d1, d2){
    this.chartMod = echarts.init(document.getElementById('piealert'));
    let option = null;
    option = {
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            }
        },
        color: ['#26A69A', '#F44336'],
        legend: {
            data:['进流量', '出流量'],
            itemGap: 5
        },
        grid: {
            top: '30',
            left: '10',
            right: '20',
            bottom: '30',
            containLabel: true
        },
        xAxis: [
            {
                type : 'time',
                boundaryGap: true
            }
        ],
        yAxis: [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name: '进流量',
                type: 'line',
                data: d1,
                areaStyle: {normal: {}}
            },
            {
                name: '出流量',
                type: 'line',
                data: d2,
                areaStyle: {normal: {}}
            }
        ]
    };
    this.chartMod.setOption(option);
    
  }

}
