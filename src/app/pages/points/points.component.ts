import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { PointsService } from '../../core/services/points/points.service';
import { PointsModel } from '../../core/models/points/points.model';

import { PagerService } from '../../core/services/common/pager.service';
import { FieldsService } from '../../core/services/dynamic-fields/fields.service';
import { UsersService } from '../../core/services/users/users.service';

import { Message  } from 'primeng/primeng';

import { ConfirmationService } from 'primeng/primeng';


@Component({
  selector: 'nga-points',
  templateUrl: './points.html',
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
                this._allUsers.push(element.admin);
            });
            console.log(this._allUsers);
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
    
    this._districtOptionLists = [];
    this._areaOptionLists = [];

    this._districtOptionLists = this._districtBasedOnProvince[value];
    this._areaOptionLists = this._areaBasedOnProvince[value];
}
}
