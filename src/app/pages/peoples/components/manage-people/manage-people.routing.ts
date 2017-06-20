import { Routes, RouterModule } from '@angular/router';
import { ManagePeopleComponent } from './manage-people.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: ManagePeopleComponent,
  },
];

export const routing = RouterModule.forChild(routes);
