import { Activite } from "./Activite";

export class Pot {
  membres: string[];
  description: string[];
  isOpen: boolean;
  value: number;
  activite: Activite[];

  constructor(public name: string){
    this.isOpen = true;
    this.description = [];
    this.membres= [];
    this.value = 0;
    this.activite= [];
  }
}
