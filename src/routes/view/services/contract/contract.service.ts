import { EventEmitter, Injectable } from '@angular/core';
import { Web3Service } from '../web3/web3.service';
import { IConfig, IDApp } from './contract.interface';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  public DApps: IDApp[] = [];
  public Config: IConfig = { AddFee: 0, ChangeFee: 0, Gateway: '' };
  public OnDAppChange: EventEmitter<void> = new EventEmitter();
  public OnDAppFeeChange: EventEmitter<void> = new EventEmitter();

  constructor(protected Web3Service: Web3Service) { }

  async LoadConfig(): Promise<IConfig> {
    try {
      this.Config = await this.Web3Service.contract.methods.GetConfig().call()
      return this.Config
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
          value: this.Web3Service.web3!.utils.toWei(this.Config.AddFee.toString(), "wei")
        })
    } catch (error) {
      return Promise.reject(error);
    }
  }


  ListenToEvents() {
    this.Web3Service.contract.events.Transfer({}, (err: any, event: any) => { })
      .on('data', () => console.log('event'))
      .on('changed', () => console.log('changed'))
      .on('error', (error: any) => console.log(error))
      .on('connected', (str: any) => console.log(str))
  }
}
