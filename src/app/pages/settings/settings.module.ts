
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Settings } from './settings.component';
import { routing } from './settings.routing';

import { SettingsService } from './../../core/services/settings/settings.service';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
  ],
  declarations: [
    Settings,
  ],
  providers: [SettingsService],
})
export class SettingsModule {}
