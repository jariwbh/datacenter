import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';


import { routing } from './add-activity.routing';
import { AddActivityComponent } from './add-activity.component';
import { FormComponent } from './form/form.component';

import { AppTranslationModule } from '../../../../app.translation.module';

import { ActivityService } from '../../../../core/services/activity/activity.service';
import { ManagepeopleService } from '../../../../core/services/people/manage-people.service';
import { FieldsService } from '../../../../core/services/dynamic-fields/fields.service';

import { GrowlModule, AutoCompleteModule } from 'primeng/primeng';
import { EditorModule, SharedModule, FileUploadModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,
    GrowlModule,
    AutoCompleteModule,
    EditorModule,
    SharedModule,
    FileUploadModule,
  ],
  declarations: [
    AddActivityComponent,
    FormComponent,
  ],
  providers: [
    ActivityService,
    ManagepeopleService,
    FieldsService
  ],
})
export class AddActivityModule {}
