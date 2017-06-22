import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing } from './add-activity.routing';
import { AddActivityComponent } from './add-activity.component';

import { AppTranslationModule } from '../../../../app.translation.module';
import { GrowlModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    NgaModule,
    routing,
    GrowlModule,
  ],
  declarations: [
    AddActivityComponent,
  ],
})
export class AddActivityModule {}
