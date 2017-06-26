import { Routes, RouterModule } from '@angular/router';
import { AddPeopleComponent } from './add-people.component';
import { FormComponent } from './forms/form.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: AddPeopleComponent,
    children: [
      { path: 'form', component: FormComponent },
      { path: 'form/:id', component: FormComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
