import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { ContractService } from '../../../services/contract/contract.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {


  get MaticToETH(): string {
    return this.ApiService.MaticQuote.price.slice(0, 8)
  }
  

  constructor(public ContractService: ContractService, public ApiService: ApiService) { }

  ngOnInit(): void {
  }

}
