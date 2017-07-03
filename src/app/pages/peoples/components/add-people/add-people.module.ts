import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing } from './add-people.routing';
import { AddPeopleComponent } from './add-people.component';
import { FormComponent } from './forms/form.component';

import { AppTranslationModule } from '../../../../app.translation.module';
import { FieldsService } from '../../../../core/services/dynamic-fields/fields.service';
import { ManagepeopleService } from '../../../../core/services/people/manage-people.service';

import { FileUploadModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

import { GMapModule, CheckboxModule, SharedModule, DialogModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    NgaModule,
    routing,
    GrowlModule,
    ReactiveFormsModule,
    FileUploadModule,
    GMapModule,
    GMapModule,
    SharedModule,
    DialogModule,
    ConfirmDialogModule,
  ],
  declarations: [
    AddPeopleComponent,
    FormComponent,
  ],
  providers: [
    ManagepeopleService,
    FieldsService,
    ConfirmationService,
  ],
})
export class AddPeopleModule {}
