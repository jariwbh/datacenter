
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../../app.constants';


@Injectable()
export class PointsService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http, private configuration: Configuration) {

        this.actionUrl = configuration.Server + 'api/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    
    public GetAll = (formName: any): Observable<any> => {
       return this.http
           .get(this.actionUrl + 'formfield/' + formName)
           .map(res => <any>res.json());
    }

    public GetById = (id: number): Observable<any> => {
       return this.http
           .get(this.actionUrl + 'ManagePeople/GetPeopleById/' + id)
           .map(res => <any>res.json());
    }

    public Add = (loginId: any, data: any): Observable<any> => {
       const toAdd = JSON.stringify(data);
       return this.http.post(this.actionUrl + 'point/' + loginId, toAdd, { headers: this.headers })
           .map(res => <any>res.json());
    }

    public AddAdminPoint = (loginId: any, data: any): Observable<any> => {
       const toAdd = JSON.stringify(data);
       return this.http.post(this.actionUrl + 'pointadmin/' + loginId, toAdd, { headers: this.headers })
           .map(res => <any>res.json());
    }

    

    public Update = (id: number, data: any): Observable<any> => {
       const toAdd = JSON.stringify(data);
       //console.log(toAdd);
       return this.http.post(this.actionUrl + 'ManagePeople/UpdatePeople/' + id, toAdd, { headers: this.headers })
           .map(res => <any>res.json());
    }

    public Delete = (id: number): Observable<any> => {
       //console.log(id);
       return this.http
           .get(this.actionUrl + 'ManagePeople/DeletePeopleById/' + id)
           .map(res => <any>res.json());
    }

    public GetAllProvince = (): Observable<any> => {
        return this.http
            .get(this.actionUrl + 'lookup/province')
            .map(res => <any>res.json());
    }

     public GetAllDistrict = (): Observable<any> => {
        return this.http
            .get(this.actionUrl + 'lookup/district')
            .map(res => <any>res.json());
    }

     public GetAllArea = (): Observable<any> => {
        return this.http
            .get(this.actionUrl + 'lookup/area')
            .map(res => <any>res.json());
    }

}
