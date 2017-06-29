import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing } from './manage-activity.routing';
import { ManageActivityComponent } from './manage-activity.component';

import { AppTranslationModule } from '../../../../app.translation.module';

import { ActivityService } from '../../../../core/services/activity/activity.service';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    NgaModule,
    routing,
  ],
  declarations: [
    ManageActivityComponent,
  ],
  providers: [
    ActivityService,
  ]
})
export class ManageActivityModule {}
