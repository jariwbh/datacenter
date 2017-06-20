import { Routes, RouterModule } from '@angular/router';
import { AddActivityComponent } from './add-activity.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: AddActivityComponent,
  },
];

export const routing = RouterModule.forChild(routes);
