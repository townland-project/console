import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TabsService } from '../../services/tabs/tabs.service';
import { Web3Service } from '../../services/web3/web3.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{

  constructor(public TabsService: TabsService, public Web3Service: Web3Service, private location: Location) { }


  Back() {
    this.location.back()
  }
}
