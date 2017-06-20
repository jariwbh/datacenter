import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing } from './add-user.routing';
import { AddUserComponent } from './add-user.component';

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
    AddUserComponent,
  ],
})
export class AddUserModule {}
