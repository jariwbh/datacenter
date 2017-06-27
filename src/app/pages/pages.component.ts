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

  menuJson: any[] = [];

  constructor(
    private _menuService: BaMenuService,
    private _authService: AuthService) {

  this.menuJson = [
   {
      "path":"pages",
      "children":[
         {
            "path":"dashboard",
            "data":{
               "menu":{
                  "title":"Main Menu",
                  "icon":"ion-android-home",
                  "selected":false,
                  "expanded":false,
                  "order":100
               }
            },
            "children":[
               {
                  "path":"dashboard",
                  "data":{
                     "menu":{
                        "title":"general.menu.dashboard"
                     }
                  }
               }
            ]
         },
         {
            "path":"users",
            "data":{
               "menu":{
                  "title":"Admin",
                  "icon":"ion-person",
                  "selected":false,
                  "expanded":false,
                  "order":100
               }
            },
            "children":[
               {
                  "path":"myprofile",
                  "data":{
                     "menu":{
                        "title":"My Profile"
                     }
                  }
               },
               {
                  "path":"add-user",
                  "data":{
                     "menu":{
                        "title":"New Admin"
                     }
                  },
                  "children":[
                     {
                        "path":"form",
                        "data":{
                           "menu":{
                              "title":"form"
                           }
                        }
                     }
                  ]
               },
               {
                  "path":"user-history",
                  "data":{
                     "menu":{
                        "title":"User History"
                     }
                  }
               }
            ]
         },
         {
            "path":"peoples",
            "data":{
               "menu":{
                  "title":"Peoples",
                  "icon":"ion-person-stalker",
                  "selected":false,
                  "expanded":false,
                  "order":100
               }
            },
            "children":[
               {
                  "path":"add-people",
                  "data":{
                     "menu":{
                        "title":"New Person"
                     }
                  },
                  "children":[
                     {
                        "path":"form",
                        "data":{
                           "menu":{
                              "title":"form"
                           }
                        }
                     }
                  ]
               },
               {
                  "path":"manage-people",
                  "data":{
                     "menu":{
                        "title":"Manage Person"
                     }
                  }
               }
            ]
         },
         {
            "path":"activities",
            "data":{
               "menu":{
                  "title":"Activity",
                  "icon":"ion-ios-pulse-strong",
                  "selected":false,
                  "expanded":false,
                  "order":100
               }
            },
            "children":[
               {
                  "path":"add-activity",
                  "data":{
                     "menu":{
                        "title":"Add Activity"
                     }
                  }
               },
               {
                  "path":"manage-activity",
                  "data":{
                     "menu":{
                        "title":"Manage Activity"
                     }
                  }
               }
            ]
         },
         {
            "path":"reports",
            "data":{
               "menu":{
                  "title":"Reports",
                  "icon":"ion-stats-bars",
                  "selected":false,
                  "expanded":false,
                  "order":100
               }
            },
            "children":[
               {
                  "path":"chartist-js",
                  "data":{
                     "menu":{
                        "title":"Reports"
                     }
                  }
               }
            ]
         },
         {
            "path":"settings",
            "data":{
               "menu":{
                  "title":"Settings",
                  "icon":"ion-gear-a",
                  "selected":false,
                  "expanded":false,
                  "order":0
               }
            }
         }
      ]
   },
   {
      "path":"",
      "children":[
         {
            "path":"login",
            "data":{
               "menu":{
                  "title":"Logout",
                  "icon":"ion-android-exit",
                  "selected":false,
                  "expanded":false,
                  "order":1
               }
            }
         }
      ]
   }
];
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
    console.log(this.menuJson);
    if (this.authRole == 'S') {
      if ( this.authPermission !== 0 ) {
        this.authPermission.forEach(element => {
          if (element == 'Create a new admin') {
            this.createNewAdmin = true;
          }
          if (element == 'View User History') {
            this.viewUserHistory = true;
          }
          if (element == 'Create a new person') {
            this.createNewPerson = true;
          }
          if (element == 'View report page') {
            this.viewReportPage = true;
          }
          if (element == 'Create a new activity') {
            this.createNewActivity = true;
          }
          if (element == 'View Manage person page') {
            this.viewManagePersonPage = true;
          }
        });

        // if (!this.createNewAdmin) {
        //   PAGES_MENU[0]['children'][1]['children'][1] = {};
        // }
        // if (!this.viewUserHistory) {
        //   PAGES_MENU[0]['children'][1]['children'][2] = {};
        // }
        // if (!this.createNewPerson) {
        //   PAGES_MENU[0]['children'][2]['children'][0] = {};
        // }
        // if (!this.viewReportPage) {
        //   PAGES_MENU[0]['children'][4]['children'] = [];
        // }
        // if (!this.createNewActivity) {
        //   PAGES_MENU[0]['children'][3]['children'][0] = {};
        // }
        // if (!this.viewManagePersonPage) {
        //   PAGES_MENU[0]['children'][2]['children'][1] = {};
        // }
      }
      this._menuService.updateMenuByRoutes(this.menuJson);
    } else if (this.authRole === 'A') {
      this._menuService.updateMenuByRoutes(this.menuJson);
    }
  }
}
