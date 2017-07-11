import { Routes, RouterModule } from '@angular/router';
import { AdminPointsComponent } from './admin-points.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: AdminPointsComponent,
  },
];

export const routing = RouterModule.forChild(routes);
