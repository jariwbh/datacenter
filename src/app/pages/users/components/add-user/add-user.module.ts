import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing } from './add-user.routing';
import { AddUserComponent } from './add-user.component';
import { FormComponent } from './form/form.component';

import { AppTranslationModule } from '../../../../app.translation.module';
import { FieldsService } from '../../../../core/services/dynamic-fields/fields.service';
import { UsersService } from '../../../../core/services/users/users.service';

import { GrowlModule } from 'primeng/primeng';
import { GMapModule, CheckboxModule, SharedModule, DialogModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,
    GrowlModule,
    GMapModule,
    CheckboxModule,
    SharedModule,
    DialogModule,
  ],
  declarations: [
    AddUserComponent,
    FormComponent,
  ],
  providers: [
    FieldsService,
    UsersService,
  ],
})
export class AddUserModule {}
