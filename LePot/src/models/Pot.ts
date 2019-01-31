import { Activite } from "./Activite";

export class Pot {
  membres: string[];
  description: string[];
  isOpen: boolean;
  value: number;
  activities: Activite[];

  constructor(public name: string){
    this.isOpen = true;
    this.description = [];
    this.membres= [];
    this.activities= [];
    this.value = 0;
  }
}
