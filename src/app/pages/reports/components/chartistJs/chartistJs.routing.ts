import { Routes, RouterModule } from '@angular/router';
import { ChartistJsComponent } from './chartistJs.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: ChartistJsComponent,
  },
];

export const routing = RouterModule.forChild(routes);
