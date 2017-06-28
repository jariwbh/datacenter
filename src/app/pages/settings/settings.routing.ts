import { Routes, RouterModule } from '@angular/router';

import { Settings } from './settings.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Settings
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
