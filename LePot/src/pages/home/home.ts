import { Component } from '@angular/core';
import { PotsPage } from '../pots/pots';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  potsPage = PotsPage;

}
