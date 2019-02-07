import * as firebase from "firebase";

export class InnerActivite{
  constructor(public name: string, public value: number, public creator: string)
  {
    //this.getCurrentUser();
  }

  /*getCurrentUser(){
    let user = firebase.auth().currentUser;
    this.creator = user.email;
  }*/

}
