import { Component } from '@angular/core';
import { AuthService } from '../../core/services/common/auth.service';

@Component({
  selector: 'nga-custom-sidebar',
  templateUrl: './custom-sidebar.html',
  styleUrls: ['./custom-sidebar.css'],
})
export class CustomSidebarComponent {

  authRole: string;
  authPermission: any = {};

  createNewAdmin = false;
  viewUserHistory = false;
  createNewPerson = false;
  viewReportPage = false;
  createNewActivity = false;
  viewManagePersonPage = false;
  managePointsPage = false;
  viewDashboardPage = false;

  constructor(
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
                if (element == 'View Dashboard page') {
                    this.viewDashboardPage = true;
                }
            });
            // console.log(this.createNewAdmin);
            // console.log(this.viewUserHistory);
            // console.log(this.createNewPerson);
            // console.log(this.viewReportPage);
            // console.log(this.createNewActivity);
            // console.log(this.viewManagePersonPage);
        }
    } else if (this.authRole === 'A') {
        this.createNewAdmin = true;
        this.viewUserHistory = true;
        this.createNewPerson = true;
        this.viewReportPage = true;
        this.createNewActivity = true;
        this.viewManagePersonPage = true;
        this.managePointsPage = true;
        this.viewDashboardPage = true;
    }
  }

  isActive = false;
    showMenu = '';
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }


}
