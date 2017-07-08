
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';

import { routing } from './chartistJs.routing';
import { ChartistJsComponent } from './chartistJs.component';
import { ChartistJsService } from './chartistJs.service';
import { ReportService } from '../../../core/services/report/report.service';

import { AppTranslationModule } from '../../../app.translation.module';
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
    ChartistJsComponent,
  ],
  providers: [
    ChartistJsService,
    ReportService,
  ],
})
export class ChartistJsModule {}
