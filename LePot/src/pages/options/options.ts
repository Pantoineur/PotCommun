import { Component } from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';

/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(private menuCtrl: MenuController) {
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

}
