import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UsersComponent } from './users.component';

export const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: 'myprofile', loadChildren: './components/myprofile/myprofile.module#MyprofileModule' },
      { path: 'add-user', loadChildren: './components/add-user/add-user.module#AddUserModule' },
      { path: 'manage-user', loadChildren: './components/manage-user/manage-user.module#ManageUserModule' },
      { path: 'user-history', loadChildren: './components/user-history/user-history.module#UserHistoryModule' },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
