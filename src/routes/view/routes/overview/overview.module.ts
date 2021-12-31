import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material';
import { OverviewComponent } from './overview/overview.component';



@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: OverviewComponent
      }
    ])
  ]
})
export class OverviewModule { }
