import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material';
// components
import { ViewComponent } from './components/view/view.component';
import { HeaderComponent } from './components/header/header.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SearchComponent } from './components/search/search.component';
import { SplashComponent } from './components/splash/splash.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewComponent,
    HeaderComponent,
    TabsComponent,
    SearchComponent,
    SplashComponent,
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
            path: '**',
            redirectTo: '/overview'
          }
        ]
      }
    ])
  ]
})
export class ViewModule { }
