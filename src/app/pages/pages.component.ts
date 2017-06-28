import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

import { CustomSidebarComponent } from './custom-sidebar/custom-sidebar.component';

@Component({
  selector: 'pages',
  template: `
    <nga-custom-sidebar></nga-custom-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>   
    <ba-back-top position="200"></ba-back-top>
    `,
})
export class Pages {
  // <ba-sidebar></ba-sidebar>
  // <nga-custom-sidebar></nga-custom-sidebar>

  constructor(
    private _menuService: BaMenuService) {
    }
}
