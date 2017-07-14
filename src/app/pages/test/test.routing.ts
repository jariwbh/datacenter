import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TestComponent } from './test.component';

export const routes: Routes = [
  {
    path: '', component: TestComponent,
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
