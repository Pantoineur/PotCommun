import { InnerActivite } from "./InnerActivite";

export class Pot {
  membres: string[];
  description: string[];
  isOpen: boolean;
  value: number;
  inActivities: InnerActivite[];
  isUserInPot : boolean;

  constructor(public name: string){
    this.isOpen = true;
    this.description = [];
    this.membres= [];
    this.value = 0;
    this.inActivities = [];
    this.isUserInPot = false;
  }

/*  getCurrentValue(){
    for(let activity of this.activities){
      this.value += activity.value;
    }
  }*/
}
