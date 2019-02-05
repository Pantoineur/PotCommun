import { OnInit, Component } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { ActivitesService } from "../../services/activite.service";
import { Pot } from "../../models/Pot";
import { NavController, ToastController, LoadingController } from "ionic-angular";
import { Activite } from "../../models/Activite";

@Component({
  selector: 'page-activite-form',
  templateUrl: './activite-form.html'
})
export class ActivityFormPage implements OnInit{
  activityForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private activiteService: ActivitesService,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController){}

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.activityForm = this.formBuilder.group({
      name:['', Validators.required],
      description: this.formBuilder.array([]),
      membres: this.formBuilder.array([])
    });
  }

  onSubmitForm(){
    let newActivity = new Activite(this.activityForm.get('name').value, this.activityForm.get('value').value);
    this.activiteService.addActivite(newActivity);
    this.onSaveList();
    this.navCtrl.pop();
  }


  onSaveList(){
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours...'
    });
    loader.present();
    this.activiteService.saveData().then(
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
