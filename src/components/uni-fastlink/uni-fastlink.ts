import { Component } from '@angular/core';

/**
 * Generated class for the UniFastlinkComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'uni-fastlink',
  templateUrl: 'uni-fastlink.html'
})
export class UniFastlinkComponent {

  text: string;

  constructor() {
    console.log('Hello UniFastlinkComponent Component');
    this.text = 'Hello World';
  }

}
