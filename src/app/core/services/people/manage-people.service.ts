
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../../app.constants';


@Injectable()
export class ManagepeopleService {

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
            .get(this.actionUrl + 'person')
            .map(res => <any>res.json());
    }
    public GetAllWithFilter = (filterBy: any, filterData: any = ''): Observable<any> => {
        if (filterBy) {
            if (filterBy === 'all') {
                return this.http
                    .get(this.actionUrl + 'person')
                    .map(res => <any>res.json());
            } else if ( filterBy === 'province' ) {
                 return this.http
                    .get(this.actionUrl + 'person/province/' + filterData)
                    .map(res => <any>res.json());
            } else if ( filterBy === 'social' ) {
                 return this.http
                    .get(this.actionUrl + '/person/social/' + filterData)
                    .map(res => <any>res.json());
            }

        }

    }
    public GetById = (id: number): Observable<any> => {
        return this.http
            .get(this.actionUrl + 'person/' + id)
            .map(res => <any>res.json());
    }

    public Add = (loginId: any, data: any): Observable<any> => {
        const toAdd = JSON.stringify(data);
        //console.log(toAdd);
        return this.http.post(this.actionUrl + 'person/' + loginId, toAdd, { headers: this.headers })
            .map(res => <any>res.json());
    }

    public Update = (id: number, data: any): Observable<any> => {
        const toAdd = JSON.stringify(data);
        //console.log(toAdd);
        return this.http.put(this.actionUrl + 'person/' + id, toAdd, { headers: this.headers })
            .map(res => <any>res.json());
    }

    public Delete = (id: number, loginId: any): Observable<any> => {
        //console.log(id);
        return this.http
            .delete(this.actionUrl + 'person/' + id + '/' + loginId)
            .map(res => <any>res.json());
    }

}
