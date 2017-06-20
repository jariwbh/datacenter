import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PeoplesComponent } from './peoples.component';

export const routes: Routes = [
  {
    path: '', component: PeoplesComponent,
    children: [
       { path: 'add-people', loadChildren: './components/add-people/add-people.module#AddPeopleModule' },
       { path: 'manage-people', loadChildren: './components/manage-people/manage-people.module#ManagePeopleModule' },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
