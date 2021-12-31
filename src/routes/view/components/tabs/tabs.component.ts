import { Component } from '@angular/core';
import { ITab } from '../../services/tabs/tabs.database';
import { TabsService } from '../../services/tabs/tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {

  get Tabs(): ITab[] {
    return this.TabsService.Tabs.filter((item) => item.show)
  }

  constructor(public TabsService: TabsService) { }
}
