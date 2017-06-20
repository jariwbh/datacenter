import { Routes, RouterModule } from '@angular/router';
import { MyprofileComponent } from './myprofile.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: MyprofileComponent,
  },
];

export const routing = RouterModule.forChild(routes);
