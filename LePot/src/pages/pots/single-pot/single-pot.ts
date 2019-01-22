import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Pot } from '../../../models/Pot';
import { PotsService } from '../../../services/pots.service';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the SinglePotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single-pot',
  templateUrl: 'single-pot.html',
})
export class SinglePotPage implements OnInit {
  index: number
  pot: Pot;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private potsService: PotsService) {
  }

  ngOnInit(){
    this.index = this.navParams.get('index');
    this.pot = this.potsService.potsList[this.index];
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

  onTogglePot(){
    this.pot.isOpen = !this.pot.isOpen;
  }

  onSubmitForm(form: NgForm){
    console.log(form.value);
    this.dismissModal();
  }

  onDeleteHours(){
    this.pot.startTime= '';
    this.pot.endTime='';
    this.dismissModal();
  }

}