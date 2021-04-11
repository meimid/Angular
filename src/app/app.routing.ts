import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'Accounts',
    loadChildren: './accounts/account.module#AcountsModule'
  },
  {
    path: 'opers',
    loadChildren: './operations/operation.module#OperationsModule'
  }
  ,
  {
    path: 'product',
    loadChildren: './product/product.module#ProductModule'
  }
  ,
  {
    path: 'car',
    loadChildren: './car/car.module#CarModule'
  }
  ]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionModule'
  }]
}, {
  path: '**',
  redirectTo: 'session/404'
}];
