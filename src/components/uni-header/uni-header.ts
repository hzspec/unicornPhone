import { Component,Input } from '@angular/core';

/**
 * Generated class for the UniHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'uni-header',
  templateUrl: 'uni-header.html'
})
export class UniHeaderComponent {

  @Input()
  title: string = '首页';

  constructor() {
  }

}
