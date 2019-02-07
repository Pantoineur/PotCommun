import { OnInit, Component } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { PotsService } from "../../services/pots.service";
import { Pot } from "../../models/Pot";
import { NavController, ToastController, LoadingController } from "ionic-angular";
import * as firebase from "firebase";

@Component({
  selector: 'page-pot-form',
  templateUrl: './pot-form.html'
})
export class PotFormPage implements OnInit{
  potForm: FormGroup;
  mail: string;

  constructor(private formBuilder: FormBuilder,
              private potsService: PotsService,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController){}

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.retrieveCurrentUser();
    this.potForm = this.formBuilder.group({
      name:['', Validators.required],
      description: this.formBuilder.array([]),
      membres: this.formBuilder.array([])
    });
  }

  retrieveCurrentUser(){
    let user = firebase.auth().currentUser;
    this.mail = user.email;
  }

  getDescriptionArray(){
    return this.potForm.get('description') as FormArray;
  }

  getMembresArray(){
    return this.potForm.get('membres') as FormArray;
  }

  onAddDescription(){
    let newControl = this.formBuilder.control('');
    this.getDescriptionArray().controls.push(newControl);
  }

  onAddMembres(){
    let newControl = this.formBuilder.control('');
    this.getMembresArray().controls.push(newControl);
  }

  onRemoveDescription(index: number){
    this.getDescriptionArray().removeAt(index);
  }

  onRemoveMembres(index: number){
    this.getMembresArray().removeAt(index);
  }

  onSubmitForm(){
    let newPot = new Pot(this.potForm.get('name').value);
    for (let control of this.getDescriptionArray().controls) {
      newPot.description.push(control.value);
    }
    for (let control of this.getMembresArray().controls) {
      newPot.membres.push(control.value);
    }
    newPot.value = 0;
    newPot.membres.push(this.mail);
    this.potsService.addPot(newPot);
    this.potsService.saveData();
    this.navCtrl.pop();
  }

}
