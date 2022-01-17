import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MFSEntry } from '../../../../../../node_modules/ipfs-core-types/src/files';
import { ConfirmService } from '../../../services/confirm/confirm.service';
import { IpfsService } from '../../../services/ipfs/ipfs.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  private path: string = '';

  @Input('Path')
  set Path(value: string) {
    this.path = value;
    this.ReadDirectory();
  }

  @Output() ChangePath: EventEmitter<string> = new EventEmitter();

  public items: MFSEntry[] = []

  constructor(private IpfsService: IpfsService, private ConfirmService: ConfirmService) { }

  ngOnInit(): void {
    this.IpfsService.Event.subscribe(() => {
      this.OpenFolder()
    })
  }

  OpenFolder(path: string = this.path): void {
    this.ChangePath.emit(path)
  }

  async ReadDirectory(): Promise<void> {
    this.items = []
    const items = this.IpfsService.ReadFolder(this.path);
    if (items == undefined) return;
    for await (const item of items) {
      this.items.push(item)
    }
  }

  GetSizeFrom(bytes: number): string {
    if (bytes == 0) return '';
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  async Open(item: MFSEntry): Promise<void> {
    if (item.type == 'directory') this.OpenFolder(`${this.path}/${item.name}`);
    else window.open(`https://${this.IpfsService.Gateway}/ipfs/${item.cid}`)
  }

  async Delete(item: MFSEntry): Promise<void> {
    let res = await this.ConfirmService.Open({
      title: `Remove ${item.name} ${item.type}`,
      subtitle: `Are you sure to remove ${item.name} ${item.type}?`,
      no: 'Keep',
      yes: 'Remove'
    });

    if (res) {
      await this.IpfsService.Remove(`${this.path}/${item.name}`)
      await this.ReadDirectory();
    }
  }
}
