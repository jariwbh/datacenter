import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PointsComponent } from './points.component';

export const routes: Routes = [
  {
    path: '', component: PointsComponent,
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
