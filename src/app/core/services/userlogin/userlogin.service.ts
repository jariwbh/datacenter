import { CommonDataService } from './../common/common-data.service';

import { AuthService } from '../common/auth.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../../app.constants';


@Injectable()
export class UserloginService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http, 
        private configuration: Configuration, 
        private _authService: AuthService,
        private _commonDataService: CommonDataService,
) {

        this.actionUrl = configuration.Server + 'api/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        // this.updateProfileData();
    }
    public login = (data: any): Observable<any> => {
       let toAdd = JSON.stringify(data);
       //console.log(toAdd);
       return this.http.post(this.actionUrl + '/admin/login', toAdd, { headers: this.headers })
           .map(res => <any>res.json());
    }
    public logout = (): any => {
           this._authService.logout();
           return true;
        // return this.http
        //     .get(this.actionUrl + 'ManagePeople/GetAllPeople')
        //     .map(res => <any>res.json());
    }
     public GetAdminById = (id: any): Observable<any> => {
       return this.http
           .get(this.actionUrl + 'admin/' + id)
           .map(res => <any>res.json());
    }
    public updateProfileData () {
        if (this._authService.auth_id !== null) {
         this.GetAdminById(this._authService.auth_id).subscribe(data => {
            if (data) {
                //console.log(data.admin.profile_picture);
                this._commonDataService.profilePicPath = data.admin.profile_picture;
                localStorage.setItem('profilePicPath', JSON.stringify(data.admin.profile_picture));
                this._commonDataService.updatePData.emit();
            }
         });
        }
          

    }

}
