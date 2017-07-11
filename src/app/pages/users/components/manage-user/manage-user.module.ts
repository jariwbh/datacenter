import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgaModule } from '../../../../theme/nga.module';

import { routing } from './manage-user.routing';
import { ManageUserComponent } from './manage-user.component';

import { AppTranslationModule } from '../../../../app.translation.module';
import { FieldsService } from '../../../../core/services/dynamic-fields/fields.service';
import { UsersService } from '../../../../core/services/users/users.service';

import { GrowlModule } from 'primeng/primeng';
import { GMapModule, CheckboxModule, DialogModule } from 'primeng/primeng';

import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { FileUploadModule } from 'primeng/primeng';

import { DataTableModule, SharedModule } from 'primeng/primeng';


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
    ConfirmDialogModule,
    FileUploadModule,
    DataTableModule,
  ],
  declarations: [
    ManageUserComponent,
  ],
  providers: [
    FieldsService,
    UsersService,
    ConfirmationService,
  ],
})
export class ManageUserModule {}
