import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public option: ConfirmOption) { }

  ngOnInit(): void {
  }

}

interface ConfirmOption {
  title: string
  subtitle: string
  no: string
  yes: string
}