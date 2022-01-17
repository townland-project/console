import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubComponent } from './github/github.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    GithubComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'github',
        component: GithubComponent
      }
    ])
  ]
})
export class AuthModule { }
