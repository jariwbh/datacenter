import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FieldsService } from '../../core/services/dynamic-fields/fields.service';
import { FieldsModel } from '../../core/models/dynamic-fields/fields.model';

import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html',
})
export class Dashboard {

  _adminlist: any[] = [];
  
  _selectedfields: any[] = [];
  _selectedfieldsHeading: any[] = [];
  _data: any[] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _usersService: UsersService,
    private _fieldsService: FieldsService,
  ) {
  }

  ngOnInit() {
    //this.getAllAdmin();
    this.getAllFields('admin');
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
