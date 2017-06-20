import { Routes, RouterModule } from '@angular/router';
import { AddPeopleComponent } from './add-people.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: AddPeopleComponent,
  },
];

export const routing = RouterModule.forChild(routes);
