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

import { GrowlModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    NgaModule,
    routing,
    GrowlModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddPeopleComponent,
    FormComponent,
  ],
  providers: [
    ManagepeopleService,
    FieldsService,
  ],
})
export class AddPeopleModule {}
