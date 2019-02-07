import { OnInit, Component } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { ActivitesService } from "../../services/activite.service";
import { Pot } from "../../models/Pot";
import { NavController, ToastController, LoadingController, NavParams } from "ionic-angular";
import { Activite } from "../../models/Activite";
import * as firebase from "firebase";
import { InnerActivite } from "../../models/InnerActivite";
import { PotsService } from "../../services/pots.service";

@Component({
  selector: 'page-activite-form',
  templateUrl: './activite-form.html'
})
export class ActivityFormPage implements OnInit{
  activityForm: FormGroup;
  index: number;

  constructor(private formBuilder: FormBuilder,
              private activitesService: ActivitesService,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private navParams: NavParams,
              private potsService: PotsService){}

  ngOnInit(){
    this.initForm();
    this.index = this.navParams.get('id');
  }

  initForm(){
    this.activityForm = this.formBuilder.group({
      name:['', Validators.required],
      value:['', Validators.required]
    });
  }

  onSubmitForm(){
    let user = firebase.auth().currentUser;
    let creator = user.email;
    let newActivity = new InnerActivite(this.activityForm.get('name').value, this.activityForm.get('value').value, creator);
    if (this.potsService.potsList[this.index].inActivities === undefined)
    {
      this.potsService.potsList[this.index].inActivities = [];
    }
    this.potsService.potsList[this.index].inActivities.push(newActivity);
    this.potsService.calculValue();
    this.navCtrl.pop();
  }


  onSaveList(){
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours...'
    });
    loader.present();
    this.activitesService.saveData(this.index, this.activitesService.activiteList).then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message:'Données sauvegardées !',
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
