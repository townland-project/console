import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../../services/contract/contract.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public columns: string[] = ['index', 'id', 'owner', 'more'];

  constructor(public ContractService: ContractService) { }

  ngOnInit(): void {
  }

}
