import { AuthService } from '../../../core/services/common/auth.service';
import { Router } from '@angular/router';
import { UserloginService } from './../../../core/services/userlogin/userlogin.service';
import { Component } from '@angular/core';

import { GlobalState } from '../../../global.state';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
})
export class BaPageTop {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  public username: string;

  constructor(private _state: GlobalState, private userloginService: UserloginService,
   private _router: Router, private authService: AuthService ) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    if (JSON.parse(localStorage.getItem('currentUser')) != null) {
            this.username = JSON.parse(localStorage.getItem('currentUser')).username;
            //this.roleList = JSON.parse(localStorage.getItem('currentUser')).roleList;
        }
    // this.username = this.authService.auth_email;
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public logout() {
        // this.userloginService.logout().subscribe(
        //     data => {
        //       console.log(data);
        //         if (data == true) {
        //             this._router.navigate(['login']);
        //         }
        //     });
        this.authService.logout();
         this._router.navigate(['login']);
    }
}
