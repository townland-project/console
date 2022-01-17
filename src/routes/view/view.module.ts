import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from './material';

// components
import { ViewComponent } from './components/view/view.component';
import { HeaderComponent } from './components/header/header.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SearchComponent } from './components/search/search.component';
import { SplashComponent } from './components/splash/splash.component';
import { GithubRepoComponent } from './components/github-repo/github-repo.component';

// services
import { GithubService } from './services/github/github.service';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ConfirmService } from './services/confirm/confirm.service';


@NgModule({
  declarations: [
    ViewComponent,
    HeaderComponent,
    TabsComponent,
    SearchComponent,
    SplashComponent,
    GithubRepoComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewComponent,
        children: [
          {
            path: 'overview',
            loadChildren: async () => (await import('./routes/overview/overview.module')).OverviewModule
          },
          {
            path: 'dapp',
            loadChildren: async () => (await import('./routes/dapp/dapp.module')).DappModule
          },
          {
            path: 'ipfs',
            loadChildren: async () => (await import('./routes/ipfs/ipfs.module')).IpfsModule
          },
          {
            path: '**',
            redirectTo: '/overview'
          }
        ]
      }
    ])
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    GithubService,
    ConfirmService,
  ]
})
export class ViewModule { }
