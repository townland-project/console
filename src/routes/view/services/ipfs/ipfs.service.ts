import { EventEmitter, Injectable } from '@angular/core';
import * as IPFS from 'ipfs-core';
import { CID } from 'multiformats/cid';
import { StatResult } from 'ipfs-core-types/src/files';
import { Web3Service } from '../web3/web3.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IpfsService {

  public node?: IPFS.IPFS;
  public NodeID?: string;
  public Gateway: string = 'cloudflare-ipfs.com';
  public Event: EventEmitter<string> = new EventEmitter(); // emit new file path

  get Online(): boolean {
    return this.node ? this.node.isOnline() : false
  }

  constructor(private Web3Service: Web3Service) { }

  public async CreateNode(id: string): Promise<void> {
    try {
      this.NodeID = id;
      let pass = !environment.production ? 'thisisaveryhugepassword' : await this.Web3Service.Sign('townland:console')
      this.node = await IPFS.create({
        repo: id,
        pass: pass
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async Peers(): Promise<number> {
    return this.node ? (await this.node.swarm.peers()).length : 0
  }

  public async CreateFolder(path: string): Promise<void> {
    if (!this.node) return Promise.reject();
    await this.node.files.mkdir(path)
    this.Event.emit(path)
  }

  public async CreateFile(path: string, data: string | Blob | Uint8Array): Promise<void> {
    if (!this.node) return Promise.reject();
    await this.node.files.write(path, data);
    this.Event.emit(path)
  }

  public GetStat(path: string): Promise<StatResult> {
    if (!this.node) return Promise.reject();
    return this.node.files.stat(path)
  }

  public ReadFolder(path: string) {
    if (!this.node) return undefined;
    return this.node.files.ls(path)
  }

  public async ReadFile(path: string): Promise<string> {
    if (!this.node) return Promise.reject();
    let chunks = [];
    for await (let chunk of this.node.files.read(path)) chunks.push(chunk)
    return chunks.toString()
  }

  public Remove(path: string): Promise<void> {
    if (!this.node) return Promise.reject();
    return this.node.files.rm(path, { 'recursive': true });
  }

  public async Exist(path: string): Promise<boolean> {
    if (!this.node) return Promise.reject();
    try {
      return (await this.node.files.stat(path)).cid.toString().length != 0
    } catch (_) {
      return false;
    }
  }

  public async GetCID(path: string): Promise<CID> {
    if (!this.node) return Promise.reject();
    return (await this.GetStat(path)).cid;
  }

  public async CreateRecercive(path: string, files: File[]): Promise<void> {
    for (let file of files) {
      if (file.webkitRelativePath) {
        let _path = file.webkitRelativePath;
        let _path_split = _path.split('/')
        if (_path_split.length == 1)
          try {
            await this.node?.files.write(`${path}/${_path}`, file)
          } catch (error) {

          }
        else {
          for (let i = 0; i < _path_split.length - 1; i++) {
            let __path = `${path}/${_path_split.slice(0, i + 1).join('/')}`
            try {
              await this.node?.files.mkdir(__path)
            } catch (error) {

            }
          }
          try {
            await this.node?.files.write(`${path}/${_path}`, file, { 'create': true })
          } catch (error) {

          }
        }
      }
    }
    this.Event.emit(path)
  }
}
