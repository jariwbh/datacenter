import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user.component';

import { FormComponent } from './form/form.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: AddUserComponent,
    children: [
            { path: 'form', component: FormComponent },
            { path: 'form/:id', component: FormComponent },
        ],
  },
];

export const routing = RouterModule.forChild(routes);
