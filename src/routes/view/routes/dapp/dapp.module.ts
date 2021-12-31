import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material';

// components
import { CreateComponent } from './create/create.component';
import { CreateFooterComponent } from './create-footer/create-footer.component';
import { NftComponent } from './nft/nft.component';
import { ListComponent } from './list/list.component';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';



@NgModule({
  declarations: [
    CreateComponent,
    CreateFooterComponent,
    NftComponent,
    ListComponent,
    CreateDialogComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'nft/:index',
        component: NftComponent
      }
    ])
  ]
})
export class DappModule { }
