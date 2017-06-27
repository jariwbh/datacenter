
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { UserModel } from './../../models/auth/user.model';

@Injectable()
export class AuthService {

  auth_email: string;
  auth_token: string; 
  auth_role: string;
  auth_id: string;
  auth_user: any;
//   customer_servicer_id : string;
//   customer_servicer_urlname : string;
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  currentUser: UserModel;

  login(user) { 
     localStorage.setItem('currentUser', JSON.stringify(user));
     this.auth_email = user.username;
     this.auth_token = user.token;
     this.auth_role = user.role;
     this.auth_id = user._id;
     this.auth_user = user.user;
  }

  isLoggedIn() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (this.currentUser) {
        //this.setBodyClass();
        return true; 
      }else {
         return false;
        }
  }

  getLoginUser() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.auth_email = this.currentUser.username;
      this.auth_token = this.currentUser.token;
      this.auth_role = this.currentUser.role;
      this.auth_id = this.currentUser._id;
      this.auth_user = this.currentUser.user;
      return this.currentUser;
      
  }

//   getUserProfile(user_data){
//     this.customer_servicer_id = user_data._id;
//     this.customer_servicer_urlname = user_data.urlname;
//   }

  logout(): void {
    //this.removeBodyClass();
    localStorage.removeItem('currentUser');
    this.auth_email = '';
    this.auth_token = '';
    this.auth_role = '';
    this.auth_id = '';
    this.auth_user = '';
    // this.customer_servicer_id = '';
    // this.customer_servicer_urlname = '';
  }
}
