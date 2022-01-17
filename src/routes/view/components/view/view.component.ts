import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractService } from '../../services/contract/contract.service';
import { ApiService } from '../../services/api/api.service';
import { IpfsService } from '../../services/ipfs/ipfs.service';
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

  constructor(private MatSnakBar: MatSnackBar, public TabsService: TabsService, private Web3Service: Web3Service, private ContractService: ContractService, private ApiService: ApiService, private IpfsService: IpfsService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.ApiService.LoadMaticPrice()
      // this.ApiService.QuoteMaticToETH()
      await this.Web3Service.Enable()
      await this.Web3Service.HelloWeb3()
      await this.Web3Service.GetAccounts()
      await this.ContractService.LoadDApps()
      await this.IpfsService.CreateNode(this.Web3Service.account);
      this.ContractService.LoadConfig()
      this.ContractService.ListenToEvents()
      this.TabsService.Listen()
      this.loading = false
    } catch (error) {
      console.error(error)
      let snakbar = this.MatSnakBar.open('Oh no, somethings went wrong!', 'Try Again')
      snakbar.afterDismissed().subscribe(() => {
        window.location.reload()
      })
    }
  }

}
