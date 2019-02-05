import * as firebase from "firebase";

export class Activite{
  creator: string
  constructor(public name: string, public value: number)
  {
    this.creator = '';
    this.getCurrentUser();
  }

  getCurrentUser(){
    let user = firebase.auth().currentUser;
    this.creator = user.email;
  }

}
