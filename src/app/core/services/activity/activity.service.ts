
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../../app.constants';


@Injectable()
export class ActivityService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http, private configuration: Configuration) {

        this.actionUrl = configuration.Server + 'api/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    public GetAll = (): Observable<any> => {
        return this.http
            .get(this.actionUrl + 'activity')
            .map(res => <any>res.json());
    }
    public GetById = (id: any): Observable<any> => {
       return this.http
           .get(this.actionUrl + 'activityById/' + id)
           .map(res => <any>res.json());
    }

    public Add = (loginID: any, data: any): Observable<any> => {
       const toAdd = JSON.stringify(data);
       return this.http.post(this.actionUrl + 'activity/' + loginID, toAdd, { headers: this.headers })
           .map(res => <any>res.json());
    }

    public Update = (id: any, data: any): Observable<any> => {
       const toAdd = JSON.stringify(data);
       //console.log(toAdd);
       return this.http.put(this.actionUrl + 'activity/' + id, toAdd, { headers: this.headers })
           .map(res => <any>res.json());
    }

    public Delete = (id: number, loginID: any): Observable<any> => {
       //console.log(id);
       return this.http
           .delete(this.actionUrl + 'activity/' + id + '/' + loginID)
           .map(res => <any>res.json());
    }

}
