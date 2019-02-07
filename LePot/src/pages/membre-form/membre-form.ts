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
  selector: 'page-membre-form',
  templateUrl: './membre-form.html'
})
export class MembreFormPage implements OnInit{
  membreForm: FormGroup;
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
    this.membreForm = this.formBuilder.group({
      mail:['', Validators.email]
    });
  }

  onSubmitForm(){
    let newMembre = this.membreForm.get('mail').value;
    if (this.potsService.potsList[this.index].membres === undefined)
    {
      this.potsService.potsList[this.index].membres = [];
    }
    this.potsService.potsList[this.index].membres.push(newMembre);
    this.potsService.saveData();
    this.navCtrl.pop();
  }

}
