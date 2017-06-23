import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../../app.constants';


@Injectable()
export class UserloginService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http, private configuration: Configuration) {

        this.actionUrl = configuration.Server + 'api/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    public login = (data: any): Observable<any> => {
       let toAdd = JSON.stringify(data);
       //console.log(toAdd);
       return this.http.post(this.actionUrl + '/admin/login', toAdd, { headers: this.headers })
           .map(res => <any>res.json());
    }

}
