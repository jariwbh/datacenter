import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { PointsService } from '../../core/services/points/points.service';
import { PointsModel } from '../../core/models/points/points.model';

import { PagerService } from '../../core/services/common/pager.service';
import { FieldsService } from '../../core/services/dynamic-fields/fields.service';
import { UsersService } from '../../core/services/users/users.service';

import { Message } from 'primeng/primeng';

import { ConfirmationService } from 'primeng/primeng';

import { AuthService } from '../../core/services/common/auth.service';


@Component({
  selector: 'nga-points',
  templateUrl: './points.html',
  styleUrls: ['./points.scss'],
})
export class PointsComponent {

  _pointsModel = new PointsModel();

  form: FormGroup;
  submitted: boolean;
  
  msgs: Message[] = [];
  errorMsgs: Message[] = [];

  _allUsers: any[] = [];
 
 // pager object
    pager: any = {};
  // paged items
    pagedItems: any[];

  _provinceLists: any[] = [];
  _districtLists: any[] = [];
  _areaLists: any[] = [];

  _districtBasedOnProvince: any[] = [];
  _areaBasedOnProvince: any[] = [];

  _districtOptionLists: any[] = [];
  _areaOptionLists: any[] = [];

  _loadData = false;
  _tableVisibility = true;

  _selectedUsersLists: any[] = [];
  _selectedUsers: any[] = [];

  authId: string;

constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _pointsService: PointsService,
    private _usersService: UsersService,
    private pagerService: PagerService,
    private _fieldsService: FieldsService,
    private confirmationService: ConfirmationService,
    private _authService: AuthService) {

    if (this._authService.auth_id === '') {
      this.authId = null;
    } else {
      this.authId = this._authService.auth_id;
    }

    this.form = fb.group({
        'points': [this._pointsModel.points, Validators.required],
    });
}

    ngOnInit() {
        this.getAllUsers();
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


    getAllUsers() {
        this._usersService
            .GetAll()
            .subscribe( data => {
                data.forEach(element => {
                    element.admin['id'] = element._id;
                    this._allUsers.push(element.admin);
                });
                if (this._allUsers.length == 0) {
                    this._tableVisibility = false;
                } else {
                    this._tableVisibility = true;
                }
                //initialize to page 1
                this.setPage(1);
            });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this._allUsers.length, page);
        // get current page of items
        this.pagedItems = this._allUsers.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.pagedItems.forEach(element => {
            this._selectedUsersLists.forEach(ele => {
                if (ele.id == element.id) {
                    element.disabled = true;
                }
            });
        });
    }

    onSubmit(value: any, isValid: boolean) {
        this.submitted = true;
        if (!isValid) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
            return false;
        } else {
            if (this._selectedUsersLists.length == 0) {
                this.msgs = [];
                this.msgs.push({
                    severity: 'error', 
                    summary: 'Error Message', 
                    detail: 'Select atleast one User',
                });
            } else {
                this._selectedUsersLists.forEach(element => {
                    let grp = {
                        name : element.fullname,
                        id : element.id,
                    };
                    this._selectedUsers.push(grp);
                });
                this._pointsModel.points = value.points;
                this._pointsModel.users = this._selectedUsers;
                if (this.authId){
                    this._pointsService
                        .Add(this.authId, this._pointsModel)
                        .subscribe(data => {
                            this.msgs = [];
                            this.msgs.push({
                                severity: 'success', 
                                summary: 'Success Message', 
                                detail: 'Point has been added Successfully!!',
                            });
                            this._router.navigate(['./pages/points']);
                        });
                }
                
            }
        }
    }

    onChangeProvince(value: any) {
        this._allUsers = [];
        this.pagedItems = [];
        
        this._tableVisibility = false;
        if (value == '') {
            this.getAllUsers();
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
        this._tableVisibility = false;
        if (value == '') {
            let proviceValue = <HTMLInputElement> document.getElementById('provice');
            if (proviceValue) {
                this.FilteredUsers('province', proviceValue.value);
            } else {
                this.getAllUsers();
            }
        } else {
            this.FilteredUsers('district', value);
        }
        
    }
    onChangeArea(value: any) {
        let districtValue = <HTMLInputElement> document.getElementById('district');
        districtValue.value = '';
        this._tableVisibility = false;
        if (value == '') {
            let proviceValue = <HTMLInputElement> document.getElementById('provice');
            if (proviceValue) {
                this.FilteredUsers('province', proviceValue.value);
            } else {
                this.getAllUsers();
            }
        } else {
            this.FilteredUsers('area', value);
        }
        
    }

    FilteredUsers(type, value) {
        this._loadData = true;
        this._allUsers = [];
    this._usersService
        .GetAll()
        .subscribe( data => {
            data.forEach(element => {
                if (type == 'province') {
                    if (element.admin.province == value) {
                        element.admin['id'] = element._id;
                        this._allUsers.push(element.admin);
                    }
                }
                if (type == 'district') {
                    if (element.admin.district == value) {
                        element.admin['id'] = element._id;
                        this._allUsers.push(element.admin);
                    }
                }
                if (type == 'area') {
                    if (element.admin.area == value) {
                        element.admin['id'] = element._id;
                        this._allUsers.push(element.admin);
                    }
                }
            });
            setTimeout(() => {   
                if (this._allUsers.length !== 0) {
                    //initialize to page 1
                    this.setPage(1);
                }
                this._tableVisibility = true;
                this._loadData = false;
            }, 1500);
            
        });
    }
    addUser(users: any) {
        this._selectedUsersLists.push(users);
        let ischecked = <HTMLInputElement> document.getElementById('addbtn_' + users.id);
        ischecked.disabled = true;

    }
    selectAll() {
        let proviceValue = <HTMLInputElement> document.getElementById('provice');
        if (proviceValue.value == '') {
            this.errorMsgs = [];
            this.errorMsgs.push({ severity: 'error', summary: 'Error Message', detail: 'Select provice failed' });
        } else {
            let districtValue = <HTMLInputElement> document.getElementById('district');
            let areaValue = <HTMLInputElement> document.getElementById('area');
            if (districtValue.value !== '' || areaValue.value !== '' || proviceValue.value !== '') {
                if (this._allUsers.length !== 0) {
                    this._allUsers.forEach(element => {
                        let existValue = this.checkUserExistsornot(element.id, this._selectedUsersLists);
                        if (existValue == 0) {
                            element.disabled = true;
                            this._selectedUsersLists.push(element);
                        }
                    });
                    this.msgs = [];
                    this.msgs.push({ 
                        severity: 'success', summary: 'Success Message', detail: 'User Added Successfully!!',
                    });
                } else {
                   this.errorMsgs = [];
                    this.errorMsgs.push({ 
                        severity: 'error', summary: 'Error Message', detail: 'No User Found!!',
                    }); 
                }
            }
        }
    }
    checkUserExistsornot(id: number, array: any) {
        let cnt = 0;
        for (let i in array) {
            if (array[i].id == id) {
                cnt++;
            }
        }
        return cnt;
    }
}
