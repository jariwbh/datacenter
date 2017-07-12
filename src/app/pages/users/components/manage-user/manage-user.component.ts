import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FieldsService } from '../../../../core/services/dynamic-fields/fields.service';
import { FieldsModel } from '../../../../core/models/dynamic-fields/fields.model';

import { UsersService } from '../../../../core/services/users/users.service';
import { Configuration } from '../../../../app.constants';

import { ConfirmationService } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'nga-manage-user',
  templateUrl: './manage-user.html',
})

export class ManageUserComponent {

    adminlist: any[] = [];
    fieldLists: any = {};
    _fieldLists: any[] = [];
    msgs: Message[] = [];


  _provinceLists: any[] = [];
  _districtLists: any[] = [];
  _areaLists: any[] = [];

  _districtBasedOnProvince: any[] = [];
  _areaBasedOnProvince: any[] = [];

  _districtOptionLists: any[] = [];
  _areaOptionLists: any[] = [];

  _countAdmin: boolean = false;
   constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _usersService: UsersService,
    private _fieldsService: FieldsService,
    private _configuration: Configuration,
    private _confirmationService: ConfirmationService,
  ) {

  }

  ngOnInit() {
    this.getAllFields('admin');
    this.getAllAdmin();

    this.getAllProvince();
    this.getAllDistrict();
    this.getAllArea();
  }
  
  getAllProvince() {
      this._fieldsService
          .GetAllProvince()
          .subscribe(
          data => {
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
              const index = element.province;
              if ( !this._areaBasedOnProvince[index] ) {
                  this._areaBasedOnProvince[index] = [];
              }
              this._areaBasedOnProvince[index].push(element.area);
              });
              
          });
    }
  
  onChangeProvince(value: any) {
        this.adminlist = [];
        if (value == '') {
            this.getAllAdmin();
        } else {
            this.FilteredUsers('province', value);
        }
        

        this._districtOptionLists = [];
        this._areaOptionLists = [];

        this._districtOptionLists = this._districtBasedOnProvince[value];
        this._areaOptionLists = this._areaBasedOnProvince[value];
  }

  onChangeDistrict(value: any) {
        let areaValue = <HTMLInputElement> document.getElementById('area');
        areaValue.value = '';
        if (value == '') {
            let proviceValue = <HTMLInputElement> document.getElementById('provice');
            if (proviceValue) {
                this.FilteredUsers('province', proviceValue.value);
            } else {
                this.getAllAdmin();
            }
        } else {
            this.FilteredUsers('district', value);
        }
        
    }
    onChangeArea(value: any) {
        let districtValue = <HTMLInputElement> document.getElementById('district');
        districtValue.value = '';
        if (value == '') {
            let proviceValue = <HTMLInputElement> document.getElementById('provice');
            if (proviceValue) {
                this.FilteredUsers('province', proviceValue.value);
            } else {
                this.getAllAdmin();
            }
        } else {
            this.FilteredUsers('area', value);
        }
        
    }

  FilteredUsers(type, value) {
    
    this.adminlist = [];
    this._usersService
        .GetAll()
        .subscribe( data => {
            data.forEach(element => {
                if (type == 'province') {
                    if (element.admin.province == value) {
                        element.admin['id'] = element._id;
                        this.adminlist.push(element.admin);
                    }
                }
                if (type == 'district') {
                    if (element.admin.district == value) {
                        element.admin['id'] = element._id;
                        this.adminlist.push(element.admin);
                    }
                }
                if (type == 'area') {
                    if (element.admin.area == value) {
                        element.admin['id'] = element._id;
                        this.adminlist.push(element.admin);
                    }
                }
            });
            if ( this.adminlist.length > 0) {
                this._countAdmin = true;
            } else {
                this._countAdmin = false;
            }
        });
    }

  getAllAdmin() {
    this._usersService
      .GetAll()
      .subscribe( data => {
        this.adminlist = [];
        data.forEach(element => {
          element.admin.id = element._id;
          this.adminlist.push(element.admin);
        });
        if ( this.adminlist.length > 0) {
            this._countAdmin = true;
        } else {
            this._countAdmin = false;
        }
      });
  }

  getAllFields(id: any) {
    this._fieldsService
          .GetAll(id)
          .subscribe(
          data => {
           this.fieldLists = data;
           data.forEach(element => {
            if (element.isDisplayOnList) {
              this._fieldLists.push(element);
            }
           });
        });
  }

  edit(user: any) {
    this._router.navigate(['/pages/users/add-user/form/' + user.id ]);
  }

  delete(user: any) {
    this._confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            this._usersService
              .Delete(user.id)
              .subscribe( data => {
                this.getAllAdmin();
                this.msgs = [];
                this.msgs.push({ severity: 'success', summary: 'Delete Message', detail: 'Admin deleted Successfully!!',
              });
              
              });
        },
    });
  }

}
