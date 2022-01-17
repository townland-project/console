import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material';

// components
import { ViewComponent } from './view/view.component';
import { ManagerComponent } from './manager/manager.component';
import { CreateItemComponent } from './create-item/create-item.component';

@NgModule({
  declarations: [
    ViewComponent,
    ManagerComponent,
    CreateItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewComponent
      }
    ])
  ]
})
export class IpfsModule { }
