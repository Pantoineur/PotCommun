import * as firebase from "firebase";
import { InnerActivite } from "./InnerActivite";

export class Activite{
  inActivities: InnerActivite[];
  constructor()
  {
    this.inActivities = [];
    //this.getCurrentUser();
  }

  /*getCurrentUser(){
    let user = firebase.auth().currentUser;
    this.creator = user.email;
  }*/

}
