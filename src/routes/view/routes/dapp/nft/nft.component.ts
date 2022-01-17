import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IDApp } from '../../../services/contract/contract.interface';
import { ContractService } from '../../../services/contract/contract.service';
import { IManifest } from '../../../services/manifest/manifest.interface';
import { ManifestService } from '../../../services/manifest/manifest.service';
import { TabsService } from '../../../services/tabs/tabs.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})
export class NftComponent implements OnInit, OnDestroy {

  public manifest!: IManifest;
  public dapp!: IDApp;
  public error!: string;

  private subscription!: Subscription;

  constructor(private ManifestService: ManifestService, private ContractService: ContractService, private TabsService: TabsService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.ActivatedRoute.params.subscribe(async (param) => {
      let index = parseInt(param['index']) - 1;
      if (this.ContractService.DApps.length < index) this.error = 'This NFT index of DApps not found.';
      else {
        await this.FetchByIndex(index);
        if(this.manifest) this.SetTab()
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  async FetchByIndex(index: number): Promise<void> {
    try {
      this.dapp = this.ContractService.DApps[index];      
      this.manifest = await this.ManifestService.FetchById(this.dapp.uri)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error);
    }
  }

  SetTab(): void {
    this.TabsService.Set({
      title: this.manifest.name,
      subtitle: this.manifest.description,
      path: window.location.pathname,
      theme: this.TabsService.Tab.theme,
      background: this.TabsService.Tab.background,
      show: false,
      backable: true
    });
  }
}
