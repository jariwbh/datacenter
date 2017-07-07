
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FieldsService } from '../../core/services/dynamic-fields/fields.service';
import { FieldsModel } from '../../core/models/dynamic-fields/fields.model';

import { UsersService } from '../../core/services/users/users.service';
import { DashboardService } from './../../core/services/dashboard/dashboard.service';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss', './chartistJs.scss'],
  templateUrl: './dashboard.html',
})
export class Dashboard {

  _adminlist: any[] = [];
  
  _selectedfields: any[] = [];
  _selectedfieldsHeading: any[] = [];
  _data: any[] = [];

 _topAdminlist: any[] = [];

  allmonthNames: any[] = [];
  data: any;
  userMapHistory: any = {};

  _chartLabelArray: any[] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _usersService: UsersService,
    private _fieldsService: FieldsService,
    private _DashboardService: DashboardService,
  ) {
  }

  ngOnInit() {
    
    this.allmonthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December',
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 
        'August', 'September', 'October', 'November', 'December',
        ];

    //this.getAllAdmin();
    this.getAllFields('admin');
    this.getTopAdminData();
  }

  getTopAdminData() {
     this._DashboardService
      .GetAllTopAdmin()
      .subscribe( data => {
          data.forEach(element => {
            element.admin[0].admin.customCount = element.count;
            element.admin[0].admin.custom_id = element._id;
            this._topAdminlist.push(element.admin[0].admin);
          });
     });
  }

  rowClick(id: any) {
    let isUser;
    isUser = <HTMLInputElement> document.getElementById('row_' + id);
    isUser.style.backgroundColor = 'rebeccapurple';
    this.getMapBasedonAdmin(id);

    this._topAdminlist.forEach(element => {
      if (id !== element.custom_id) {
         isUser = <HTMLInputElement> document.getElementById('row_' + element.custom_id);
         isUser.style.backgroundColor = 'transparent';
      }
    });
    
  }
  getMapBasedonAdmin(id: any) {
    this._DashboardService
      .GetAllTopAdminChart(id)
      .subscribe( data => {
        
        // find Maximum Year
        let maxYear = 0;
        let maxMonth = 0;

        data.forEach(element => {
          if (element._id.year > maxYear ) {
            maxYear = element._id.year;
          }
        });

        if ( maxYear !== 0) {
          data.forEach(element => {
            if (element._id.year == maxYear ) {
              if (element._id.month > maxMonth ) {
                maxMonth = element._id.month;
              }
            }
          });
        }
        let cnt = 1;
        let anotherCounter = 1;
        this.allmonthNames.forEach(element => {
          if (cnt >= maxMonth ) {
            if (anotherCounter <= 12) {
              //console.log(cnt);
              this._chartLabelArray.push(element);
              anotherCounter++;
            }
          }
          cnt++;
        });
        // console.log(this._chartLabelArray);
        // console.log( maxYear + ' --> '  + maxMonth );
        // console.log(this.allmonthNames[parseInt(maxMonth) + 1]);
        this.userMapHistory = {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              series: [
                [15, 24, 43, 27, 5, 10, 23, 44, 68, 100, 26, 8],
              ],
              simpleBarOptions: {
                fullWidth: true,
                height: '300px',
              },
        };

      });
  }
  getAllFields(id: any) {
    this._fieldsService
        .GetAll(id)
        .subscribe(
        data => {
          data.forEach(element => {
            if (element.isDisplayOnList) {
              const index = element.labelname;
              if ( !this._selectedfields[index] ) {
                this._selectedfields[index] = [];
              }
              this._selectedfieldsHeading.push(element);
              this._selectedfields[index] = index;
            }
          });
          this.getAllAdmin();
      });
  }

  getAllAdmin() {
    this._usersService
          .GetAll()
          .subscribe(
          data => {
            if (data) {
              data.forEach(element => {
                if (element.admin) {
                  this._adminlist.push(element.admin);
                }
              });
              for ( let i = 0; i < this._adminlist.length; i++ ) {
                if ( !this._data[i] ) {
                    this._data[i] = [];
                }
                for ( let j = 0 ; j < this._selectedfields.length; j++ ) {
                  console.log(this._selectedfields[j]);
                  const fieldName = this._selectedfields[j].toLowerCase();
                  const fieldValue = this._adminlist[i][fieldName];
                  const group = {
                    val: fieldValue,
                  };
                  this._data[i].push(group);
                }
              }
             // console.log(this._data);
            }
        });
  }

}
