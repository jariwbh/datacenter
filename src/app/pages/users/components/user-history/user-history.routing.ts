import { Routes, RouterModule } from '@angular/router';
import { UserHistoryComponent } from './user-history.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: UserHistoryComponent,
  },
];

export const routing = RouterModule.forChild(routes);
