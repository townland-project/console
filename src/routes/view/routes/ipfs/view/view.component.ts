import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../services/confirm/confirm.service';
import { FsService } from '../../../services/fs/fs.service';
import { IpfsService } from '../../../services/ipfs/ipfs.service';
import { Web3Service } from '../../../services/web3/web3.service';
import { CreateItemComponent } from '../create-item/create-item.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  public path: string = '';
  public loading: boolean = true;
  public creating: boolean = false;
  public peers: number = 0;
  private interval: any;

  get root(): string {
    return `/${this.Web3Service.account.replace('0x', '')}`
  }

  get backable(): boolean {
    return this.path.split('/').length != this.root.split('/').length
  }

  constructor(private MatDialog: MatDialog, private MatSnackBar: MatSnackBar, public IpfsService: IpfsService, private Web3Service: Web3Service, private FsService: FsService, private ConfirmService: ConfirmService) { }

  async ngOnInit(): Promise<void> {
    this.SetPeers();
    if (!await this.IpfsService.Exist(this.root))
      this.IpfsService.CreateFolder(this.root)
    this.path = this.root;
    this.loading = false;
    this.IpfsService.Event.subscribe(() => {
      this.MatSnackBar.open('IPFS changed!', 'OK', { duration: 3000 })
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

  private async SetPeers() {
    this.peers = await this.IpfsService.Peers();
    this.interval = setInterval(async () => {
      this.peers = await this.IpfsService.Peers();      
    }, 5000);
  }

  public Back(): void {
    if (this.backable) {
      let path = this.path.split('/')!
      path = path.slice(0, path.length - 1)
      this.path = path.join('/')
    }
  }

  Create(mode: 'directory' | 'file') {
    let dialog = this.MatDialog.open(CreateItemComponent, {
      data: mode,
      disableClose: true
    })

    dialog.afterClosed().subscribe(async name => {
      this.creating = true;
      if (mode == 'file') await this.IpfsService.CreateFile(`${this.path}/${name}`, '')
      else await this.IpfsService.CreateFolder(`${this.path}/${name}`)
      this.creating = false;
    })
  }

  async Upload() {
    try {
      let files: File[] = await this.FsService.Folder()
      if (files.length != 0) {
        let res = await this.ConfirmService.Open({
          'title': 'Upload files from local',
          'subtitle': `Are you sure to upload ${files.length} file${files.length == 1 ? '' : 's'} from your local to IPFS?`,
          'no': 'Cancel',
          'yes': 'Upload'
        })

        if (res) {
          this.creating = true;
          await this.IpfsService.CreateRecercive(this.path, files);
          this.creating = false;
        }
      }
    } catch (error) {
      this.creating = false;
      console.error(error)
    }
  }
}
