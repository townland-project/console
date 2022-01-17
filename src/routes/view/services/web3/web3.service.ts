import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  public web3: Web3 | undefined;
  public contract: any;
  public account: string = '';
  public accounts: string[] = [];

  private abi_url: string = 'https://cloudflare-ipfs.com/ipfs/QmQSNGCH3E44pFobM7iq6hLXHV9MkAdadHLhSHLEc5VLBn';
  private contract_address: string = '0x4AE53185a1f21ae61574f8a03fE32F31a6D6E528';

  constructor() { }

  private async FetchABI(): Promise<any> {
    try {
      let res = await fetch(this.abi_url)
      let json = await res.json();
      return json['output']['abi'];
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async HelloWeb3(): Promise<void> {
    try {
      if (this.IsAvailable()) {
        let abi = await this.FetchABI();
        this.web3 = new Web3((window as any).ethereum);
        this.contract = new this.web3.eth.Contract(abi as any, this.contract_address)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  IsAvailable(): boolean {
    return (window as any).ethereum != undefined;
  }

  async Enable(): Promise<void> {
    return await (window as any).ethereum.enable();
  }

  GetAccounts(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.web3!.eth.getAccounts((err, accounts) => {
        if (err) reject()
        this.accounts = accounts
        this.account = accounts[0]
        this.web3!.eth.defaultAccount = this.account
        resolve()
      })
    })
  }

  SetAccount(account: string) {
    this.account = account;
    this.web3!.eth.defaultAccount = this.account;
  }

  Sign(message: string): Promise<string> | undefined {
    let hash = this.web3?.utils.sha3(message)!
    return this.web3?.eth.sign(hash, this.account)
  }
}
