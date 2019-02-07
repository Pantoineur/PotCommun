import { Pot } from "../models/Pot";
import { Subject } from "rxjs/Subject";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Activite } from "../models/Activite";
import { InnerActivite } from "../models/InnerActivite";

export class PotsService{

  pots$ = new Subject<Pot[]>();
  mail: string;

  potsList: Pot[] = [{
    membres: [
        'orencohen2652@gmail.com',
        'danco2652@gmail.com',
        'antoineyvan@gmail.com'
      ],
      name: 'Barcelone',
      description: [
        'pot commun pour vacances a Barcelone'
      ],
      inActivities:[
        new InnerActivite('Test',50,'test@default.fr')
      ],
      value: 0,
      isOpen: true,
      isUserInPot: false
    }];

  addPot(pot: Pot){
    this.potsList.push(pot);
    this.emitPots();
  }

  emitPots(){
    console.log("emitPots");
    this.pots$.next(this.potsList.slice());
  }

  retrieveCurrentUser(){
    let user = firebase.auth().currentUser;
    this.mail = user.email;
  }
  
  calculValue(){
    for(let i = 0; i < this.potsList.length; i++)
    {
      this.potsList[i].value = 0;
      for (let j = 0; j < this.potsList[i].inActivities.length; j++)
      {
        this.potsList[i].value += +this.potsList[i].inActivities[j].value;
      }
    }
  }

  saveData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('pots').set(this.potsList).then(
        (data: DataSnapshot) => {
          resolve(data);
        }
      ).catch(
        (error) => {
          reject(error);
        }
      );
    });
  }

  retrieveData(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('pots').once('value').then(
        (data: DataSnapshot) => {
          console.log(this.potsList);
          this.potsList = data.val();
          console.log(this.potsList);
          this.emitPots();
          resolve('Données récupérées avec succès ! ');
        }
      ).catch(
        (error) =>  {
          reject(error);
        }
      );
    });
  }
}
