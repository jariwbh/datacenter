import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ReportsComponent } from './reports.component';

export const routes: Routes = [
  {
    path: '', component: ReportsComponent,
    children: [
       { path: 'chartist-js', loadChildren: './components/chartistJs/chartistJs.module#ChartistJsModule' },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

