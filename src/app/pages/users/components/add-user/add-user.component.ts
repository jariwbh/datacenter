import { Component, OnInit, Input } from '@angular/core';

import { Message } from 'primeng/primeng';
import { AuthService } from '../../../../core/services/common/auth.service';


@Component({
  selector: 'nga-add-user',
  templateUrl: './add-user.html',
})


export class AddUserComponent {

  authRole: string;
  authPermission: any = {};

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

      if (this.authRole === 'S') {
        if ( this.authPermission !== 0 ) {
          let cnt = 0;
          this.authPermission.forEach(element => {
            if (element === 'Create a new admin') {
              cnt++;
            }
          });
          if (cnt === 0) {
            console.log('no permission access');  
          }
        } else {
          console.log('no permission access');
        }
      }
    }
  
}
