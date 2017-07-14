import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing } from './user-history.routing';
import { UserHistoryComponent } from './user-history.component';

import { AppTranslationModule } from '../../../../app.translation.module';

import { AuditService } from '../../../../core/services/audit/audit.service';

import { MultiSelectModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    NgaModule,
    routing,
    MultiSelectModule,
  ],
  declarations: [
    UserHistoryComponent,
  ],
  providers: [
    AuditService,
  ],
})
export class UserHistoryModule {}
