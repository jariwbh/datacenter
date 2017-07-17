import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing } from './test.routing';
import { TestComponent } from './test.component';

import { UsersService } from '../../core/services/users/users.service';
import { FieldsService } from '../../core/services/dynamic-fields/fields.service';

import { MultiSelectModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,
    MultiSelectModule,
  ],
  declarations: [
    TestComponent,
  ],
  providers: [
    UsersService,
    FieldsService,
  ],
})
export class TestModule {}
