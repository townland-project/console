import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FsService {
  constructor() { }

  public async FileFromURI(uri: string): Promise<Blob> {
    try {
      let res = await fetch(uri)
      return await res.blob()
    } catch (error) {
      return Promise.reject()
    }
  }

  public File(option: FileOption = {}): Promise<File[]> {
    return new Promise((resolve) => {
      let input = this._CreateInput(option);
      input.click();
      input.onchange = (event: Event) => {
        this._DestroyInput();
        resolve((event.target as any).files);
      }
    })
  }

  public Folder(): Promise<File[]> {
    return new Promise((resolve) => {
      let input = this._CreateInput({ multi: true });
      input.webkitdirectory = true;
      input.click();
      input.onchange = (event: Event) => {
        this._DestroyInput();
        resolve((event.target as any).files);
      }
    })
  }

  private _CreateInput(option: FileOption): HTMLInputElement {
    this._DestroyInput();

    let input = document.createElement('input')
    input.type = 'file';
    input.id = 'FS-SERVICE';
    input.multiple = option.multi || false
    input.accept = option.types?.join(',') || ''
    input.style.visibility = 'none';
    input.style.opacity = '0';
    document.body.appendChild(input);
    return input;
  }

  private _DestroyInput(): void {
    document.getElementById('FS-SERVICE')?.parentElement?.removeChild(document.getElementById('FS-SERVICE')!)
  }
}

interface FileOption {
  multi?: boolean
  types?: string[]
}