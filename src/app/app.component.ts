import { Component, ViewContainerRef } from '@angular/core';
import * as $ from 'jquery';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';
import { Title } from '@angular/platform-browser';

import { SettingsService } from './core/services/settings/settings.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  template: `
    <main [class.menu-collapsed]="isMenuCollapsed" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class App {

  isMenuCollapsed: boolean = false;
  _websiteTittle: string;

  constructor(
    private _state: GlobalState,
    private _imageLoader: BaImageLoaderService,
    private _spinner: BaThemeSpinner,
    private viewContainerRef: ViewContainerRef,
    private themeConfig: BaThemeConfig,
    private titleService: Title,
    private _settingsService: SettingsService) {
        themeConfig.config();
        this._loadImages();
        this.setTittle();
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
          this.isMenuCollapsed = isCollapsed;
        });
  }

  setTittle() {
    this._settingsService
      .GetAllSetting()
      .subscribe(data => {
        if (data) {
          if (data.websiteTitle) {
            this._websiteTittle = data.websiteTitle;
            this.titleService.setTitle(this._websiteTittle);
          }
        }
        this.titleService.setTitle(this._websiteTittle);
    });
    
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load('/assets/img/sky-bg.jpg'));
  }

}
