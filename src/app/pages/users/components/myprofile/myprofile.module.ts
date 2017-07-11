import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing } from './myprofile.routing';
import { MyprofileComponent } from './myprofile.component';

import { AppTranslationModule } from '../../../../app.translation.module';

import { FieldsService } from '../../../../core/services/dynamic-fields/fields.service';
import { UsersService } from '../../../../core/services/users/users.service';
import { FileUploadModule } from 'primeng/primeng';

import { GrowlModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    NgaModule,
    routing,
    GrowlModule,
     FileUploadModule,
  ],
  declarations: [
    MyprofileComponent,
  ],
  providers: [
    FieldsService,
    UsersService,
  ]
})
export class MyprofileModule {}
