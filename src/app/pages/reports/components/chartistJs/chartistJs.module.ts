import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing } from './chartistJs.routing';
import { ChartistJsComponent } from './chartistJs.component';
import { ChartistJsService } from './chartistJs.service';

import { AppTranslationModule } from '../../../../app.translation.module';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    NgaModule,
    routing,
  ],
  declarations: [
    ChartistJsComponent,
  ],
  providers: [
    ChartistJsService,
  ],
})
export class ChartistJsModule {}
