import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../../core/services/users/users.service';
import { FieldsService } from '../../core/services/dynamic-fields/fields.service';

import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'nga-test',
  templateUrl: './test.html',
  styleUrls: ['./test.scss'],
})
export class TestComponent {

    _allAdminLists: any [] = [];
    adminlist: any [] = [];
    _searchAdmin: SelectItem[];
    _selectedAdmins: string[] = [];

    _provinceLists: any[] = [];
    _districtLists: any[] = [];
    _areaLists: any[] = [];

    _districtBasedOnProvince: any[] = [];
    _areaBasedOnProvince: any[] = [];

    _districtOptionLists: any[] = [];
    _areaOptionLists: any[] = [];

   constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _usersService: UsersService,
    private _fieldsService: FieldsService,
  ) {
  }
   ngOnInit() {
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
        
      this._districtOptionLists = [];
      this._areaOptionLists = [];

      this._districtOptionLists = this._districtBasedOnProvince[value];
      this._areaOptionLists = this._areaBasedOnProvince[value];
  }

    onChangeDistrict(value: any) {

    }

    onChangeArea(value: any) {
    }

  getAllAdmin() {
    this._usersService
      .GetAll()
      .subscribe( data => {
        this.adminlist = [];
         this._searchAdmin = [];
        data.forEach(element => {
          this._allAdminLists.push(element.admin);
          this.adminlist.push(element.admin);
          this._searchAdmin.push({ label: element.admin.fullname, value: element.admin.fullname });
        });
      });
  }
  onChange(event: any) {
    if (event.value.length !== 0) {
      this.adminlist = [];
      this._allAdminLists.forEach(element => {
        event.value.forEach(ele => {
          if (ele == element.fullname) {
            this.adminlist.push(element);
          }
        });
      });
    } else {
      this.adminlist = this._allAdminLists;
    }
    
  }

}
