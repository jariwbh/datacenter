import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { PointsService } from '../../core/services/points/points.service';
import { PointsModel } from '../../core/models/points/points.model';

import { PagerService } from '../../core/services/common/pager.service';
import { FieldsService } from '../../core/services/dynamic-fields/fields.service';
import { UsersService } from '../../core/services/users/users.service';

import { Message, SelectItem } from 'primeng/primeng';

import { ConfirmationService } from 'primeng/primeng';


@Component({
  selector: 'nga-points',
  templateUrl: './points.html',
})
export class PointsComponent {

  _pointsModel = new PointsModel();

  form: FormGroup;
  submitted: boolean;

  types: SelectItem[];
  msgs: Message[] = [];

  _allUsers: any[] = [];
 selectedType: string;

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

  _provinceVisibility = false;
  _districtVisibility = false;
  _areaVisibility = false;

  _tableVisibility = true;
  _loadData = false;
  errorFields = false;
  usererrorFields = false;

  saveUsers: any[] = [];
  
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

    this.types = [];
    this.types.push({ label: 'All Users', value: 'users' });
    this.types.push({ label: 'Province Wise Users', value: 'province' });
    this.types.push({ label: 'District Wise Users', value: 'district' });
    this.types.push({ label: 'Area Wise Users', value: 'area' });

    this.selectedType = 'users';
}

ngOnInit() {
    this.getAllUsers();
    this.getAllProvince();
    this.getAllDistrict();
    this.getAllArea();
}

confirm(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                this.remove(id, this.pagedItems);
            },
        });
    }

buttonChnage(event: any) {

    this.errorFields = false;
    this.usererrorFields = false;

    this._pointsModel.province = '';
    this._pointsModel.district = '';
    this._pointsModel.area = '';

    this._districtOptionLists = [];
    this._areaOptionLists = [];
    
    this._tableVisibility = false;

    if (event.value == 'province') {
        this._provinceVisibility = true;
        this._districtVisibility = false;
        this._areaVisibility = false;
    } else if (event.value == 'district') {
        this._provinceVisibility = true;
        this._districtVisibility = true;
        this._areaVisibility = false;
    } else if (event.value == 'area') {
        this._provinceVisibility = true;
        this._districtVisibility = false;
        this._areaVisibility = true;
    } else if (event.value == 'users') {
        this.getAllUsers();
        this._provinceVisibility = false;
        this._districtVisibility = false;
        this._areaVisibility = false;
    }
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
    this.errorFields = false;
    this.usererrorFields = false;
    this._allUsers = [];
    this.pagedItems = [];
    if (this.selectedType == 'province') {
        this.Users(this.selectedType, value);
    }
    this._districtOptionLists = [];
    this._areaOptionLists = [];

    this._districtOptionLists = this._districtBasedOnProvince[value];
    this._areaOptionLists = this._areaBasedOnProvince[value];
}

onChangeDistrict(value: any) {
    
    this.errorFields = false;
    this.usererrorFields = false;

    this._tableVisibility = false;
    this.Users(this.selectedType, value);
}

onChangeArea(value: any) {
    this.errorFields = false;
    this.usererrorFields = false;
    
    this._tableVisibility = false;
    this.Users(this.selectedType, value);
}

remove(id: number, array: any) {
    for (let i in array) {
      if (array[i]['id'] == id) {
        array.splice(i, 1);
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
      }
    }
    if ( this.pagedItems.length == 0) {
        this._tableVisibility = false;
    }
}
getAllUsers() {
    this._allUsers = [];
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

Users(type, value) {
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
                if (this._allUsers.length == 0) {
                    this._tableVisibility = false;
                } else {
                    this._tableVisibility = true;
                    //initialize to page 1
                    this.setPage(1);
                }
                this._loadData = false;
            }, 1500);
            
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

        if (this.selectedType == 'users') {
            if (this.pagedItems.length == 0) {
                //console.log('select user');
                this.usererrorFields = true;
            } else {
                //console.log('submitted');
                this.submitForms();
            }
        } else if (this.selectedType == 'province') {
            if (this._pointsModel.province == '') {
                //console.log('select provice');
                this.errorFields = true;
            } else {
                if (this.pagedItems.length == 0) {
                    //console.log('select user');
                    this.usererrorFields = true;
                } else {
                    //console.log('submitted');
                    this.submitForms();
                }   
            }
        } else if (this.selectedType == 'district') {
            if (this._pointsModel.province == '' || this._pointsModel.district == '') {
                //console.log('select provice && district');
                    this.errorFields = true;
            } else {
                if (this.pagedItems.length == 0) {
                    //console.log('select user');
                    this.usererrorFields = true;
                } else {
                    //console.log('submitted');
                    this.submitForms();
                }   
            }

        } else if (this.selectedType == 'area') {

            if (this._pointsModel.province == '' || this._pointsModel.area == '') {
                //console.log('select provice && area');
                this.errorFields = true;
            } else {
                if (this.pagedItems.length == 0) {
                    //console.log('select user');
                    this.usererrorFields = true;
                } else {
                    //console.log('submitted');
                    this.submitForms();
                }   
            }
        }
        
      }
  }
  submitForms() {

    this.pagedItems.forEach(element => {
        let grp = {
            id: element.id,
            name: element.fullname,
        };
        this.saveUsers.push(grp);
    });

      this._pointsModel.users = this.saveUsers;

      this._pointsService
        .Add(this._pointsModel)
        .subscribe( data => {
            console.log(data);
            this.msgs = [];
            this.msgs.push ({ 
            severity: 'info', summary: 'Insert Message', detail: 'Points has been added Successfully!!!' });
        });
  }
}
