import { Subject } from "rxjs/Subject";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Activite } from "../models/Activite";

export class ActivitesService{

  activites$ = new Subject<Activite[]>();

  activiteList: Activite[] = [{
      name: 'Peages',
      value: 0,
      creator: 'test',
      getCurrentUser(){
        this.creator =firebase.auth().currentUser.email;
      }
    }];

  addActivite(activite: Activite){
    this.activiteList.push(activite);
    this.emitActivites();
  }

  emitActivites(){
    this.activites$.next(this.activiteList.slice());
  }

  saveData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('pots').set(this.activiteList).then(
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
          this.activiteList = data.val();
          this.emitActivites();
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
