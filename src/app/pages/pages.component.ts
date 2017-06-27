import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

import { AuthService } from '../core/services/common/auth.service';

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
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

  authRole: string;
  authPermission: any = {};

  createNewAdmin = false;
  viewUserHistory = false;
  createNewPerson = false;
  viewReportPage = false;
  createNewActivity = false;
  viewManagePersonPage = false;

  constructor(
    private _menuService: BaMenuService,
    private _authService: AuthService) {
      
      if (this._authService.auth_user.role === '') {
        this.authRole = null;
      } else {
        this.authRole = this._authService.auth_user.role;
      }

      if (!this._authService.auth_user.acl) {
        this.authPermission = [];
      } else {
        this.authPermission = this._authService.auth_user.acl;
      }
  }

  ngOnInit() {
    if (this.authRole === 'S') {
      if ( this.authPermission !== 0 ) {
        this.authPermission.forEach(element => {
          if (element === 'Create a new admin') {
            this.createNewAdmin = true;
          }
          if (element === 'View User History') {
            this.viewUserHistory = true;
          }
          if (element === 'Create a new person') {
            this.createNewPerson = true;
          }
          if (element === 'View report page') {
            this.viewReportPage = true;
          }
          if (element === 'Create a new activity') {
            this.createNewActivity = true;
          }
          if (element === 'View Manage person page') {
            this.viewManagePersonPage = true;
          }
        });
        if (!this.createNewAdmin) {
          PAGES_MENU[0]['children'][1]['children'][1] = {};
        }
        if (!this.viewUserHistory) {
          PAGES_MENU[0]['children'][1]['children'][2] = {};
        }
        if (!this.createNewPerson) {
          PAGES_MENU[0]['children'][2]['children'][0] = {};
        }
        if (!this.viewReportPage) {
          PAGES_MENU[0]['children'][4]['children'] = [];
        }
        if (!this.createNewActivity) {
          PAGES_MENU[0]['children'][3]['children'][0] = {};
        }
        if (!this.viewManagePersonPage) {
          PAGES_MENU[0]['children'][2]['children'][1] = {};
        }
      }
      this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    } else if (this.authRole === 'A') {
      this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }
  }
}
