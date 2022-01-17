import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private MatDialog: MatDialog) { }

  Open(option: ConfirmOption): Promise<boolean> {
    return new Promise((resolve) => {
      let dialog = this.MatDialog.open(ConfirmComponent, {
        data: option,
        disableClose: true
      })

      dialog.afterClosed().subscribe(result => resolve(result == undefined ? false : result))
    })
  }
}

interface ConfirmOption {
  title: string
  subtitle: string
  no: string
  yes: string
}