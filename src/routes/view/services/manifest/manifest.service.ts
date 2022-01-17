import { Injectable } from '@angular/core';
import { IManifest } from './manifest.interface';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {

  constructor() { }

  async FetchById(url: string): Promise<IManifest> {
    try {
      let res = await fetch(url)
      return await res.json()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  ToFile(manifest: IManifest): File {
    const str = JSON.stringify(manifest);
    const bytes = new TextEncoder().encode(str);
    return new File([bytes], 'manifest.json', {
      type: "application/json;charset=utf-8"
    });
  }
}
