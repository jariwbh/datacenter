import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './../core/services/common/auth-guard.service';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule',
  },
  {
    path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule',
  },
  {
    path: 'pages', component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'editors', loadChildren: './editors/editors.module#EditorsModule' },
      { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: './ui/ui.module#UiModule' },
      { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: './maps/maps.module#MapsModule' },
      { path: 'users', loadChildren: './users/users.module#UsersModule' },
      { path: 'peoples', loadChildren: './peoples/peoples.module#PeoplesModule' },
      { path: 'activities', loadChildren: './activity/activity.module#ActivityModule' },
      { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
      { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
      { path: 'no-permission', loadChildren: './no-permission/no-permission.module#NoPermissionModule' },
      { path: 'points', loadChildren: './points/points.module#PointsModule' },
    ],
    canActivate: [AuthGuard],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
