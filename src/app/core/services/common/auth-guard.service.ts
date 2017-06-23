
import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
//import { UserModel } from './shared/model/user.model';
//import { UserModel } from './../../../shared/models/auth/user.model';

@Injectable()
export class AuthGuard implements CanActivate {

  //currentUser: UserModel;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
      
    if (this.authService.isLoggedIn()) {
     return true; 
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
  
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
