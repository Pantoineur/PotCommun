import { OnInit, Component } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { PotsService } from "../../services/pots.service";
import { Pot } from "../../models/Pot";
import { NavController } from "ionic-angular";

@Component({
  selector: 'page-pot-form',
  templateUrl: './pot-form.html'
})
export class PotFormPage implements OnInit{
  potForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private potsService: PotsService,
              private navCtrl: NavController){}

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.potForm = this.formBuilder.group({
      name:['', Validators.required],
      description: this.formBuilder.array([])
    });
  }

  getDescriptionArray(){
    return this.potForm.get('description') as FormArray;
  }

  onAddDescription(){
    let newControl = this.formBuilder.control('');
    this.getDescriptionArray().controls.push(newControl);
  }

  onRemoveDescription(index: number){
    this.getDescriptionArray().removeAt(index);
  }

  onSubmitForm(){
    let newPot = new Pot(this.potForm.get('name').value);
    for (let control of this.getDescriptionArray().controls) {
      newPot.description.push(control.value);
    }
    this.potsService.addPot(newPot);
    this.navCtrl.pop();
  }

}
