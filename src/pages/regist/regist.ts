import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
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
})
export class RegistPage {
  
  public form:FormGroup;
  public name:AbstractControl;
  public nickname:AbstractControl;
  public email:AbstractControl;
  public phone:AbstractControl;
  public password:AbstractControl;
  public confirmPassword:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    fb:FormBuilder
  ) {
    this.form = fb.group({
        name: ['', Validators.compose([Validators.required])],
        nickname: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, emailValidator])],
        phone: ['', Validators.compose([Validators.required, phoneValidator])],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

    this.name = this.form.controls['name'];
    this.nickname = this.form.controls['nickname'];
    this.email = this.form.controls['email'];
    this.phone = this.form.controls['phone'];
    this.password = this.form.controls['password'];
    this.confirmPassword = this.form.controls['confirmPassword'];
  }

  ionViewDidLoad() {
  }

  closeModal(){
    this.viewCtrl.dismiss();
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
