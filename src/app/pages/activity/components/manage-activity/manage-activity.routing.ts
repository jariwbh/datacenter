import { Routes, RouterModule } from '@angular/router';
import { ManageActivityComponent } from './manage-activity.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: ManageActivityComponent,
  },
];

export const routing = RouterModule.forChild(routes);
