import { EventEmitter } from '@angular/core';

export class CommonDataService {
    authId: string;
    a: any;
    filterDataBy: string = '';
    filterData: string = '';
    profilePicPath: string = '';
    updatePData = new EventEmitter();
    constructor(
   
) {
    }

}
