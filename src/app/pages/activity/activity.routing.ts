import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ActivityComponent } from './activity.component';

export const routes: Routes = [
  {
    path: '', component: ActivityComponent,
    children: [
       { path: 'add-activity', loadChildren: './components/add-activity/add-activity.module#AddActivityModule' },
       { path: 'manage-activity', 
          loadChildren: './components/manage-activity/manage-activity.module#ManageActivityModule' },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
