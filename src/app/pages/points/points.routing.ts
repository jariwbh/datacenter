import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PointsComponent } from './points.component';

export const routes: Routes = [
  {
    path: '', component: PointsComponent,
    children: [
      { path: 'admin', loadChildren: './components/admin-points/admin-points.module#AdminPointsModule' },
      { path: 'person', loadChildren: './components/person-points/person-points.module#PersonPointsModule' },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
