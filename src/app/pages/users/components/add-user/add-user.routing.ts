import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: AddUserComponent,
  },
];

export const routing = RouterModule.forChild(routes);
