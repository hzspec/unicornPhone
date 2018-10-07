import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the RegistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist',
  templateUrl: 'regist.html',
  providers: [UserProvider]
})
export class RegistPage {
  
  registmethod:string = 'normal';

  public form:FormGroup;
  public name:AbstractControl;
  public password:AbstractControl;
  public confirmPassword:AbstractControl;

  phonenumber:string = '';
  phonepassword:string = '';
  isEnableSend:boolean = true;
  isValidPhone:boolean = true;
  lastsecond:number = 0;
  intervalphone:any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    fb:FormBuilder,
    private serv:UserProvider,
    private alertCtrl:AlertController
  ) {
    this.form = fb.group({
        name: ['', Validators.compose([Validators.required])],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

    this.name = this.form.controls['name'];
    this.password = this.form.controls['password'];
    this.confirmPassword = this.form.controls['confirmPassword'];
  }

  ionViewDidLoad() {
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  registPhone(){
    this.serv.registPhone(this.phonenumber, this.phonepassword).then(()=>{
      const alert = this.alertCtrl.create({
        title: '注册成功!',
        subTitle: '点击确定登录!',
        buttons: [{
          text: '确定',
          handler: ()=>{
            this.viewCtrl.dismiss();
          }
        }]
      });
      alert.present();
    }).catch(()=>{
      const alert = this.alertCtrl.create({
        title: '验证失败!',
        subTitle: '请检查手机号和验证码是否正确!',
        buttons: ['确定']
      });
      alert.present();
    });
  }

  checkisphone(val){
    var phoneRegexp = /^1[3|4|5|7|8][0-9]{9}$/;    
    if (!phoneRegexp.test(val)) {
        return false;
    }
    return true;
  }

  getVerifynum(){
    if(this.checkisphone(this.phonenumber)){
      this.isValidPhone = true;
      this.isEnableSend = false;

      this.serv.sendVerifynum(this.phonenumber);
      this.lastsecond = 60;
      this.intervalphone = setInterval(()=>{
        this.lastsecond--;
        if(this.lastsecond <= 0){
          this.clearTime();
        }
      }, 1000);
    }else{
      this.isValidPhone = false;
    }
    
  }

  clearTime(){
    if(this.intervalphone){
      clearInterval(this.intervalphone);
    }
    this.isEnableSend = true;
  }

  ionViewDidLeave(){
    this.clearTime();
  }

}

export function emailValidator(control: FormControl): {[key: string]: any} {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
  if (control.value && !emailRegexp.test(control.value)) {
      return {invalidEmail: true};
  }
}
//
export function phoneValidator(control: FormControl): {[key: string]: any} {
  var phoneRegexp = /^1[3|4|5|7|8][0-9]{9}$/;    
  if (control.value && !phoneRegexp.test(control.value)) {
      return {invalidPhone: true};
  }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
      let password= group.controls[passwordKey];
      let passwordConfirmation= group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
          return passwordConfirmation.setErrors({mismatchedPasswords: true})
      }
  }
}
