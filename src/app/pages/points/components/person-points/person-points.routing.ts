import { Routes, RouterModule } from '@angular/router';
import { PersonPointsComponent } from './person-points.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: PersonPointsComponent,
  },
];

export const routing = RouterModule.forChild(routes);
