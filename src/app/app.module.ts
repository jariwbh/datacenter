
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';

//Custom Services & Config [21-6-2017]
import { CoreModule } from './core/core.module';
import { Configuration } from './app.constants';
import { AuthService } from './core/services/common/auth.service';
import { AuthGuard } from './core/services/common/auth-guard.service';
import { UserloginService } from './core/services/userlogin/userlogin.service';
import { CommonDataService } from './core/services/common/common-data.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsService } from './core/services/settings/settings.service';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void,
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing,
    CoreModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    AuthService,
    AuthGuard,
    UserloginService,
    CommonDataService,
    Title,
    SettingsService,
  ],
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}
