import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { CustomSidebarComponent } from './custom-sidebar/custom-sidebar.component';

import { Pages } from './pages.component';

@NgModule({
  imports: [
      CommonModule, 
      AppTranslationModule, 
      NgaModule, 
      routing,
  ],
  declarations: [
    Pages,
    CustomSidebarComponent,
  ],
})
export class PagesModule {
}
