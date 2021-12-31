import { Injectable } from '@angular/core';
import { IPolygonGetMaticPrice, IQuoteMaticToETH } from './api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public MaticPrice: string = '0';
  public MaticQuote: IQuoteMaticToETH = { 'gas': '0', 'gasPrice': '0', 'price': '0' };

  private polygon_api_key: string = 'QC5MDM8F6BE163W3JZYG9BC7PEN2K27UEG';

  constructor() { }

  async LoadMaticPrice(): Promise<IPolygonGetMaticPrice> {
    try {
      let res = await fetch(`https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=${this.polygon_api_key}`);
      let json: IPolygonGetMaticPrice = await res.json();
      this.MaticPrice = json.result.maticusd
      return json
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async QuoteMaticToETH(matic: number = 1): Promise<IQuoteMaticToETH> {
    try {
      let res = await fetch(`https://api.0x.org/swap/v1/quote?sellToken=0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0&sellAmount=${matic * 1000000000000000000}&buyToken=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&slippagePercentage=0.03&skipValidation=true&affiliateAddress=0xc770eefad204b5180df6a14ee197d99d808ee52d`)
      let json: IQuoteMaticToETH = await res.json();
      this.MaticQuote = json
      return json
    } catch (error) {
      return Promise.reject(error);
    }
  }
}