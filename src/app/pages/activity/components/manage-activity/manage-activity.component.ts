import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ActivityService } from '../../../../core/services/activity/activity.service';
import { ActivityModel } from '../../../../core/models/activity/activity.model';


import { Message } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';
import { AuthService } from '../../../../core/services/common/auth.service';
import { Configuration } from '../../../../app.constants';
import { FieldsService } from '../../../../core/services/dynamic-fields/fields.service';

@Component({
  selector: 'nga-manage-activity',
  templateUrl: './manage-activity.html',
  styleUrls: ['./manage-activity.css'],
})

export class ManageActivityComponent {
  
  _activityModel = new ActivityModel();
  _allActivites: any [] = [];
  _dateWiseActivites = [];
  msgs: Message[] = [];

  serverPath: string;
  authId: string;

  _provinceLists: any[] = [];
  _districtLists: any[] = [];
  _areaLists: any[] = [];

  _districtBasedOnProvince: any[] = [];
  _areaBasedOnProvince: any[] = [];

  _districtOptionLists: any[] = [];
  _areaOptionLists: any[] = [];

  _filteredArray: any = {};

  _allProvinceLists: any[] = [];
  _allDistrictLists: any[] = [];
  _allAreaLists: any[] = [];
  _allActivityTypes: any[] = [];

  

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _activityService: ActivityService,
    private confirmationService: ConfirmationService,
    private _configuration: Configuration,
    private _authService: AuthService,
    private _fieldsService: FieldsService,
  ) {
    this.serverPath = this._configuration.Server;
        
        if (this._authService.auth_id === '') {
          this.authId = null;
        } else {
          this.authId = this._authService.auth_id;
        }
        
        this._filteredArray.activitytype = {};
        this._filteredArray.province = {};
        this._filteredArray.district = {};
        this._filteredArray.area = {};

        this._allActivityTypes = ['hashtag', 'facebook', 'telegram', 'other'];
  } 

  ngOnInit() {
    this.getAllActivities();

    this.getAllProvince();
    this.getAllDistrict();
    this.getAllArea();
  }

  getAllProvince() {
      this._fieldsService
          .GetAllProvince()
          .subscribe(
          data => {
            data.forEach(element => {
              this._allProvinceLists.push(element.name);
            });
              this._provinceLists  = data;
          });
  }
  getAllDistrict() {
      this._fieldsService
          .GetAllDistrict()
          .subscribe(
          data => {
              this._districtLists  = data;
              this._districtLists.forEach(element => {
                this._allDistrictLists.push(element.district);
              const index = element.province;
              if ( !this._districtBasedOnProvince[index] ) {
                  this._districtBasedOnProvince[index] = [];
              }
              this._districtBasedOnProvince[index].push(element.district);
              });
              
          });
    }

    getAllArea() {
      this._fieldsService
          .GetAllArea()
          .subscribe(
          data => {
              this._areaLists  = data;
              this._areaLists.forEach(element => {
                this._allAreaLists.push(element.area);
              const index = element.province;
              if ( !this._areaBasedOnProvince[index] ) {
                  this._areaBasedOnProvince[index] = [];
              }
              this._areaBasedOnProvince[index].push(element.area);
              });
              
          });
    }
  
  onChangeType(value: any) {
    
    this._filteredArray['activitytype'] = [];
    this._filteredArray['province'] = [];
    this._filteredArray['district'] = [];
    this._filteredArray['area'] = [];
    
    let proviceValue = <HTMLInputElement> document.getElementById('provice');
    let districtValue = <HTMLInputElement> document.getElementById('district');
    let areaValue = <HTMLInputElement> document.getElementById('area');

    if (value == '' && proviceValue.value == '') {

      this.getAllActivities();

    } else {

      if ( value == '') {
        this._filteredArray['activitytype'] = this._allActivityTypes;
      } else {
        this._filteredArray['activitytype'].push(value);
      }

      if (proviceValue.value == '') {
         this._filteredArray['province'] = this._allProvinceLists;
      } else {
        this._filteredArray['province'].push(proviceValue.value);
      }

      if (districtValue.value == '') {
         this._filteredArray['district'] = this._allDistrictLists;
      } else {
        this._filteredArray['district'].push(districtValue.value);
      }

      if (areaValue.value == '') {
         this._filteredArray['area'] = this._allAreaLists;
      } else {
        this._filteredArray['area'].push(areaValue.value);
      }

      this.getAllActivitiesByFiltter(this._filteredArray);
    }
  }

  onChangeProvince(value: any) {
    
        this._filteredArray['activitytype'] = [];
        this._filteredArray['province'] = [];
        this._filteredArray['district'] = [];
        this._filteredArray['area'] = [];

        let typeValue = <HTMLInputElement> document.getElementById('activitytype');
        let districtValue = <HTMLInputElement> document.getElementById('district');
        let areaValue = <HTMLInputElement> document.getElementById('area');

          if (value == '' && typeValue.value == '') {
            this.getAllActivities();
          } else {
            
            if ( value == '') {
              this._filteredArray['province'] = this._allProvinceLists;
            } else {
              this._filteredArray['province'].push(value);
            }

            if (typeValue.value == '') {
              this._filteredArray['activitytype'] = this._allActivityTypes;
            } else {
              this._filteredArray['activitytype'].push(typeValue.value);
            }

            if (districtValue.value == '') {
              this._filteredArray['district'] = this._allDistrictLists;
            } else {
              this._filteredArray['district'].push(districtValue.value);
            }

            if (areaValue.value == '') {
              this._filteredArray['area'] = this._allAreaLists;
            } else {
              this._filteredArray['area'].push(areaValue.value);
            }

            this.getAllActivitiesByFiltter(this._filteredArray);
          }

        this._districtOptionLists = [];
        this._areaOptionLists = [];

        this._districtOptionLists = this._districtBasedOnProvince[value];
        this._areaOptionLists = this._areaBasedOnProvince[value];
  }

  onChangeDistrict(value: any) {
        
        this._filteredArray['activitytype'] = [];
        this._filteredArray['province'] = [];
        this._filteredArray['district'] = [];
        this._filteredArray['area'] = [];
        
        let typeValue = <HTMLInputElement> document.getElementById('activitytype');
        let proviceValue = <HTMLInputElement> document.getElementById('provice');
        let areaValue = <HTMLInputElement> document.getElementById('area');
        areaValue.value = '';

        if ( (value == '') && (typeValue.value == '') && (proviceValue.value == '')) {
          this.getAllActivities();
        } else {

            if ( value == '') {
              this._filteredArray['district'] = this._allDistrictLists;
            } else {
              this._filteredArray['district'].push(value);
            }

            if (typeValue.value == '') {
              this._filteredArray['activitytype'] = this._allActivityTypes;
            } else {
              this._filteredArray['activitytype'].push(typeValue.value);
            }

            if (proviceValue.value == '') {
              this._filteredArray['province'] = this._allProvinceLists;
            } else {
              this._filteredArray['province'].push(proviceValue.value);
            }

            this._filteredArray['area'] = this._allAreaLists;
            this.getAllActivitiesByFiltter(this._filteredArray);
        }
        
    }
    onChangeArea(value: any) {
        this._filteredArray['activitytype'] = [];
        this._filteredArray['province'] = [];
        this._filteredArray['district'] = [];
        this._filteredArray['area'] = [];
        
        let typeValue = <HTMLInputElement> document.getElementById('activitytype');
        let proviceValue = <HTMLInputElement> document.getElementById('provice');
        let districtValue = <HTMLInputElement> document.getElementById('district');
        districtValue.value = '';

        if ( (value == '') && (typeValue.value == '') && (proviceValue.value == '')) {
          this.getAllActivities();
        } else {

            if ( value == '') {
              this._filteredArray['area'] = this._allAreaLists;
            } else {
              this._filteredArray['area'].push(value);
            }

            if (typeValue.value == '') {
              this._filteredArray['activitytype'] = this._allActivityTypes;
            } else {
              this._filteredArray['activitytype'].push(typeValue.value);
            }

            if (proviceValue.value == '') {
              this._filteredArray['province'] = this._allProvinceLists;
            } else {
              this._filteredArray['province'].push(proviceValue.value);
            }

            this._filteredArray['district'] = this._allDistrictLists;
            this.getAllActivitiesByFiltter(this._filteredArray);
      }
        
    }
  

  getAllActivitiesByFiltter(value) {
    this._activityService
      .GetActivityBySearch(value)
      .subscribe( data => {
        this._allActivites = [];
        let cnt = 0;
        this._allActivites = data;
        this._allActivites.forEach(element => {
            if ( cnt % 2 === 0) {
              element.customClass = '';
            } else {
              element.customClass = 'timeline-inverted';
            }
            let startDateTime = new Date(element['createdAt']); 
            let startStamp = startDateTime.getTime();
            element.customSinceTime = this.updateClock(startStamp);
          cnt++;
        });
      });
  }
  getAllActivities() {
    this._activityService
      .GetAll()
      .subscribe( data => {
        let cnt = 0;
        this._allActivites = data;
        this._allActivites.forEach(element => {
          if ( cnt % 2 === 0) {
            element.customClass = '';
          } else {
            element.customClass = 'timeline-inverted';
          }
          let startDateTime = new Date(element['createdAt']); 
          let startStamp = startDateTime.getTime();
          element.customSinceTime = this.updateClock(startStamp);
        cnt++;
      });
      //console.log(this._allActivites);
      });
  }

  
  updateClock(startStamp) {
    let newDate = new Date();
    let newStamp = newDate.getTime();
    let diff = Math.round((newStamp-startStamp)/1000);
    
    let d = Math.floor(diff/(24*60*60)); /* though I hope she won't be working for consecutive days :) */
    diff = diff-(d*24*60*60);
    let h = Math.floor(diff/(60*60));
    diff = diff-(h*60*60);
    let m = Math.floor(diff/(60));
    diff = diff-(m*60);
    let s = diff;
    
    return  d + " day(s), " + h + " hour(s), " + m + " minute(s), " + s + " second(s) ago";
}


  edit(id: any) {
    this._router.navigate(['/pages/activities/add-activity/form/' + id]);
  }

  detail(id: any) {
    this._router.navigate(['/pages/activities/detail-activity/form/' + id]);
  }

  delete(id: any) { 
    this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                if (this.authId) {
                  this._activityService
                    .Delete(id, this.authId)
                    .subscribe( data => {
                      this.getAllActivities();
                      this.msgs = [{ 
                        severity: 'info', 
                        summary: 'Confirmed', 
                        detail: 'Activity has been deleted Successfully!!',
                      }];
                    });
                }
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            },
        });
  }
}
