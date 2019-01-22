import { Component } from '@angular/core';
import { PotsPage } from '../pots/pots';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage{
  potsPage = PotsPage;
  settingsPage = SettingsPage;
}
