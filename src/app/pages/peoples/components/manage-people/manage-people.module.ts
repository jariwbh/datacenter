import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing } from './manage-people.routing';
import { ManagePeopleComponent } from './manage-people.component';

import { AppTranslationModule } from '../../../../app.translation.module';
import { DataTableModule, SharedModule } from 'primeng/primeng';

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
    DataTableModule,
    SharedModule,
    GrowlModule,
  ],
  declarations: [
    ManagePeopleComponent,
  ],
  providers: [
    ManagepeopleService,
    FieldsService,
  ],
})
export class ManagePeopleModule {}
