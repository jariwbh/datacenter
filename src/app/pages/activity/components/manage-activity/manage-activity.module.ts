import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing } from './manage-activity.routing';
import { ManageActivityComponent } from './manage-activity.component';

import { AppTranslationModule } from '../../../../app.translation.module';

import { ActivityService } from '../../../../core/services/activity/activity.service';

import { ConfirmDialogModule, ConfirmationService, GrowlModule } from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    NgaModule,
    routing,
    ConfirmDialogModule,
    GrowlModule,
  ],
  declarations: [
    ManageActivityComponent,
  ],
  providers: [
    ActivityService,
    ConfirmationService,
  ],
})
export class ManageActivityModule {}
