import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ContractService } from '../../services/contract/contract.service';
import { TabsService } from '../../services/tabs/tabs.service';
import { Web3Service } from '../../services/web3/web3.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewComponent implements OnInit {

  public loading: boolean = true;

  constructor(public TabsService: TabsService, private Web3Service: Web3Service, private ContractService: ContractService, private ApiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.ApiService.LoadMaticPrice()
    this.ApiService.QuoteMaticToETH()
    await this.Web3Service.Enable()
    await this.Web3Service.HelloWeb3()
    await this.Web3Service.GetAccounts()
    await this.ContractService.LoadDApps()
    this.ContractService.LoadFee()
    this.ContractService.ListenToEvents()
    this.TabsService.Listen()
    this.loading = false
  }

}
