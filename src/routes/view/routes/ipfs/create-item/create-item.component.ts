import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  public name: string = '';
  constructor(private ref: MatDialogRef<CreateItemComponent>, @Inject(MAT_DIALOG_DATA) public mode: 'directory' | 'file') { }

  ngOnInit(): void {
  }

  submit(): void {
    this.ref.close(this.name)
  }
}
