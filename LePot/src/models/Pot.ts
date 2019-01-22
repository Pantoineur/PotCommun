export class Pot {
  description: string[];
  isOpen: boolean;
  startTime: string;
  endTime: string;

  constructor(public name: string){
    this.isOpen = false;
    this.startTime = '';
    this.endTime = '';
    this.description = [];
  }
}
