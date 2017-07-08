import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing } from './points.routing';
import { PointsComponent } from './points.component';
import { AppTranslationModule } from '../../app.translation.module';

import { PointsService } from '../../core/services/points/points.service';
import { UsersService } from '../../core/services/users/users.service';
import { ManagepeopleService } from '../../core/services/people/manage-people.service';
import { PagerService } from '../../core/services/common/pager.service';
import { FieldsService } from '../../core/services/dynamic-fields/fields.service';

import { SelectButtonModule } from 'primeng/primeng';

import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { GrowlModule, MessagesModule } from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,
    SelectButtonModule,
    ConfirmDialogModule,
    GrowlModule,
    MessagesModule,
  ],
  declarations: [
    PointsComponent,
  ],
  providers: [
    PointsService,
    UsersService,
    PagerService,
    FieldsService,
    ConfirmationService,
    ManagepeopleService,
  ],
})
export class PointsModule {}
