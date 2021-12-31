import { Component, OnInit } from '@angular/core';
import { IDApp } from '../../services/contract/contract.interface';
import { ContractService } from '../../services/contract/contract.service';
import { ManifestService } from '../../services/manifest/manifest.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public open: boolean = false;
  public search: string = '';

  constructor(public ManifestService: ManifestService, public ContractService: ContractService) { }

  ngOnInit(): void {
  }

  Filter(): IDApp[] {
    if (this.search.length == 0) return []

    return this.ContractService.DApps.filter((dapp) => {
      if (dapp.index == this.search) return true;
      else if (dapp.id.includes(this.search)) return true;
      else if (dapp.owner.includes(this.search)) return true;
      else return false;
    })
  }
}
