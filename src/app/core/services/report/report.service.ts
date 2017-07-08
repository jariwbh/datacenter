
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../../app.constants';


@Injectable()
export class ReportService {

    private actionUrl: string;
    private headers: Headers;
    selectMonthYearArray: any[] = [];
    monthYearArrayByDate: any[] = [];
    defaultLabelArr: string[] = [];
    defaultseriesArr: number[] = [];

    constructor(private http: Http, private configuration: Configuration) {

        this.actionUrl = configuration.Server + 'api/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.loadMonthArray();
    }
    // public GetAll = (): Observable<any> => {
    //     return this.http
    //         .get(this.actionUrl + 'ManagePeople/GetAllPeople')
    //         .map(res => <any>res.json());
    // }
    // let theMonths = new Array('January', 'February', 'March', 'April', 'May',
    //  'June', 'July', 'August', 'September', 'October', 'November', 'December');

    loadMonthArray(currentYear: number = 0, currentMonth: number = 0) {
        let theMonths = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
        let today = new Date();
        let aMonth = today.getMonth();
        let aYear = today.getFullYear();
        if (currentYear !== 0) {
            if (currentMonth !== 0) {
                aYear = currentYear;
                aMonth = currentMonth;
            }
        }
        let i;

        for (i = 0; i < 12; i++) {
            // document.writeln(theMonths[aMonth] + '<br>');
            this.selectMonthYearArray.push({ year: aYear, month: theMonths[aMonth], monthNo: aMonth + 1 });
            if (aMonth === 0) {
                aMonth = 12;
                aYear = aYear - 1;
            }
            // aMonth++;
            aMonth--;
            // console.log(theMonths[aMonth] );
            // if (aMonth > 11) {
            //   aMonth = 0;
            //   aYear = aYear - 1;
            // }
        }
        this.selectMonthYearArray = this.selectMonthYearArray.reverse();
        if (this.selectMonthYearArray !== []) {
            this.selectMonthYearArray.forEach(ele => {
                this.defaultLabelArr.push(ele.month);
                this.defaultseriesArr.push(0);
            });
        }

    }

    loadLastMonthsArray(currentYear: number = 0, currentMonth: number = 0): any {
        let theMonths = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
        let today = new Date();
        let aMonth = today.getMonth();
        let aYear = today.getFullYear();
        if (currentYear !== 0) {
            if (currentMonth !== 0) {
                aYear = currentYear;
                aMonth = currentMonth;
            }
        }
        let i;

        for (i = 0; i < 12; i++) {
            // document.writeln(theMonths[aMonth] + '<br>');
            
            this.monthYearArrayByDate.push({ year: aYear, month: theMonths[aMonth - 1], monthNo: aMonth });
            
            // aMonth++;
            aMonth--;
            if (aMonth === 0) {
                aMonth = 12;
                aYear = aYear - 1;
            }
            // console.log(theMonths[aMonth] );
            // if (aMonth > 11) {
            //   aMonth = 0;
            //   aYear = aYear - 1;
            // }
        }

        return this.monthYearArrayByDate.reverse();
        
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
    public GetUserCountsHistoryProvince = (province: string): Observable<any> => {
        return this.http
            .get(this.actionUrl + 'reportperson/province/' + province)
            .map(res => <any>res.json());
    }
     public GetUserCountsHistoryDistrict = (district: string): Observable<any> => {
        return this.http
            .get(this.actionUrl + 'reportperson/district/' + district)
            .map(res => <any>res.json());
    }

     public GetUserPointsHistoryProvince = (province: string): Observable<any> => {
        return this.http
            .get(this.actionUrl + 'reportpoint/province/' + province)
            .map(res => <any>res.json());
    }
     public GetUserPointsHistoryDistrict = (district: string): Observable<any> => {
        return this.http
            .get(this.actionUrl + 'reportpoint/district/' + district)
            .map(res => <any>res.json());
    }
    // public GetById = (id: number): Observable<any> => {
    //    return this.http
    //        .get(this.actionUrl + 'ManagePeople/GetPeopleById/' + id)
    //        .map(res => <any>res.json());
    // }

    // public Update = (id: number, data: any): Observable<any> => {
    //    let toAdd = JSON.stringify(data);
    //    //console.log(toAdd);
    //    return this.http.post(this.actionUrl + 'setting' + id, toAdd, { headers: this.headers })
    //        .map(res => <any>res.json());
    // }

    // public Delete = (id: number): Observable<any> => {
    //    //console.log(id);
    //    return this.http
    //        .get(this.actionUrl + 'ManagePeople/DeletePeopleById/' + id)
    //        .map(res => <any>res.json());
    // }

}
