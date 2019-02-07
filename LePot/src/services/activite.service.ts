import { Subject } from "rxjs/Subject";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Activite } from "../models/Activite";
import { Pot } from "../models/Pot";
import { InnerActivite } from "../models/InnerActivite";

export class ActivitesService{

  activites$ = new Subject<Activite[]>();

  activiteList: Activite[] = [{
    inActivities: [
      new InnerActivite('test',50,'test@default.fr')
    ]
    }];

  addActivite(activite: InnerActivite, index: number){
    this.activiteList[index].inActivities.push(activite);
    this.emitActivites();
  }

  emitActivites(){
    this.activites$.next(this.activiteList.slice());
  }

  saveData(index: number, activities: Activite[]) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('pots/'+index+'/inActivities/').set(activities).then(
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

  /*retrieveData(potsList: Pot[]){
    return new Promise((resolve, reject) => {
      for (let index=0; index < potsList.length; index++)
      {
        console.log(potsList[index]);
        console.log(index);
        for (let innerIndex=0; innerIndex < this.activiteList[index].inActivites.length; innerIndex++)
        {
          console.log("inId ==>"+innerIndex);
          console.log("inAct.length ==>"+this.activiteList[index].inActivites.length);
          console.log("inAct[inId] ==>"+this.activiteList[index].inActivites[innerIndex]);
          console.log(this.activiteList.length);
          firebase.database().ref('pots/'+index+'/inActivities').once('value').then(
            (data: DataSnapshot) => {
              console.log(data.val());
              this.activiteList[index].inActivites = data.val();
              this.emitActivites();
              resolve('Données récupérées avec succès ! '); // Virer ascynchronicité pour corriger problème (alt: faire promesse dans pots.ts)
            }
          ).catch(
            (error) =>  {
              reject(error);
            }
          );
        }
      }
    });
  }*/
}
