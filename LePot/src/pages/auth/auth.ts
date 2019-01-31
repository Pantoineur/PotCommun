import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { PotsService } from '../../services/pots.service';

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage implements OnInit {

  mode: string;
  authForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService,
              public navParams: NavParams,
              private menuCtrl: MenuController,
              private formBuilder: FormBuilder,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private potsService: PotsService,
              private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();

  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

  newUser(){
    this.navCtrl.push(AuthPage, {mode: 'connect'});
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmitForm(){
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    if (this.mode === 'new'){
      this.authService.signUpUser(email, password).then(
        () => {
          this.navCtrl.setRoot(TabsPage);
        }
      ).catch(
        (error) => {
          this.errorMessage = error;
        }
      );
    } else if (this.mode === 'connect') {
      this.authService.signInUser(email,password).then(
        ()=> {
          this.navCtrl.setRoot(TabsPage);
        }
      ).catch(
        (error) => {
          this.errorMessage = error;
        }
      );
    }
    let loader = this.loadingCtrl.create({
      content: 'Récupération en cours...'
    });
    loader.present();
    this.potsService.retrieveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message:'Données récupérées !',
          duration: 3000,
          position: 'top'
        }).present();
      }
    ).catch(
      (error)=>{
        loader.dismiss();
        this.toastCtrl.create({
          message:error,
          duration:3000,
          position: 'top'
        }).present();
      }
    );
  }
}
