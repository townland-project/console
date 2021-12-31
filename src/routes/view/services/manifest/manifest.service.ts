import { Injectable } from '@angular/core';
import { IManifest } from './manifest.interface';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {

  constructor() { }

  GetImageById(id: string): string {
    return `https://dapp.townland.xyz/id/${id}/image.png`
  }

  async FetchById(id: string): Promise<IManifest> {
    try {
      let res = await fetch(`https://dapp.townland.xyz/id/${id}/manifest.json`)
      return await res.json()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
