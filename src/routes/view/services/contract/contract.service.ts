import { EventEmitter, Injectable } from '@angular/core';
import { Web3Service } from '../web3/web3.service';
import { IDApp } from './contract.interface';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  public Fee: number = 0;
  public Index: number = 0;
  public DApps: IDApp[] = [];
  public OnDAppChange: EventEmitter<void> = new EventEmitter();
  public OnDAppFeeChange: EventEmitter<void> = new EventEmitter();

  constructor(protected Web3Service: Web3Service) { }

  async LoadFee(): Promise<number> {
    try {
      this.Fee = await this.Web3Service.contract.methods.GetFee().call()
      return this.Fee
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async LoadLastIndex(): Promise<number> {
    try {
      this.Index = await this.Web3Service.contract.methods.GetLastIndex().call()
      return this.Index
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetDAppByIndex(index: number): Promise<number> {
    try {
      this.Index = await this.Web3Service.contract.methods.GetDAppByIndex(index).call()
      return this.Index
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetDAppUri(index: number): Promise<string> {
    try {
      return await this.Web3Service.contract.methods.uri(index).call()
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async LoadDApps(): Promise<IDApp[]> {
    try {
      this.DApps = await this.Web3Service.contract.methods.GetDApps().call()
      return this.DApps
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async AddDApp(id: string): Promise<void> {
    try {
      await this.Web3Service.contract.methods.AddDApp(id.split('.'))
        .send({
          from: this.Web3Service.account,
          value: this.Web3Service.web3!.utils.toWei(this.Fee.toString(), "wei")
        })
    } catch (error) {
      return Promise.reject(error);
    }
  }


  ListenToEvents() {
    this.Web3Service.contract.getPastEvents('OnDAppChange', {})
      .then((results: any) => console.log(results))
      .catch((err: any) => console.error(err));

    this.Web3Service.contract.events.OnDAppChange({}, (err: any, event: any) => { })
      .on('data', () => console.log('event'))
      .on('changed', () => console.log('changed'))
      .on('error', (error: any) => console.log(error))
      .on('connected', (str: any) => console.log(str))

    this.Web3Service.contract.events.OnDAppFeeChange({}, (err: any, event: any) => { })
      .on('data', function (event: any) {
        console.log('data'); // same results as the optional callback above
      })
      .on('changed', function (event: any) {
        console.log('changed') // remove event from local database
      })
      .on('error', console.error);
  }
}
