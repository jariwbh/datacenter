import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NoPermissionComponent } from './no-permission.component';

export const routes: Routes = [
  {
    path: '', component: NoPermissionComponent,
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
