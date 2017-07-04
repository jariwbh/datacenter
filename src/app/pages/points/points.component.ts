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

constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _pointsService: PointsService,
    private _usersService: UsersService,
    private pagerService: PagerService,
    private _fieldsService: FieldsService,
    private confirmationService: ConfirmationService) {

    this.form = fb.group({
        'type': [this._pointsModel.type, Validators.required],
        'province': [this._pointsModel.province],
        'district': [this._pointsModel.district],
        'area': [this._pointsModel.area],
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
    }

    onSubmit(value: any, isValid: boolean) {
        this.submitted = true;
        if (!isValid) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
            return false;
        } else {
            console.log('here');
        }
    }

    onChangeProvince(value: any) {
        
        this._allUsers = [];
        this.pagedItems = [];
        
        this._tableVisibility = false;
        this.FilteredUsers('province', value);

        this._districtOptionLists = [];
        this._areaOptionLists = [];

        this._districtOptionLists = this._districtBasedOnProvince[value];
        this._areaOptionLists = this._areaBasedOnProvince[value];
    }

    onChangeDistrict(value: any) {
        this._tableVisibility = false;
        this.FilteredUsers('district', value);
    }

    onChangeArea(value: any) {
        this._tableVisibility = false;
        this.FilteredUsers('area', value);
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
}
