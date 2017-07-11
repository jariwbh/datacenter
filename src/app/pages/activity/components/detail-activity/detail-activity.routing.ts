import { Routes, RouterModule } from '@angular/router';
import { DetailActivityComponent } from './detail-activity.component';

import { FormComponent } from './form/form.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: DetailActivityComponent,
    children: [
            { path: 'form', component: FormComponent },
            { path: 'form/:id', component: FormComponent },
        ],
  },
];

export const routing = RouterModule.forChild(routes);
