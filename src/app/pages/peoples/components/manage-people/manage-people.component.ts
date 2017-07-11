import { CommonDataService } from './../../../../core/services/common/common-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FieldsService } from '../../../../core/services/dynamic-fields/fields.service';
import { FieldsModel } from '../../../../core/models/dynamic-fields/fields.model';

import { ManagepeopleService } from '../../../../core/services/people/manage-people.service';

import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { Configuration } from '../../../../app.constants';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'nga-manage-people',
  templateUrl: './manage-people.html',
  styleUrls: ['./manage-people.scss'],
})

export class ManagePeopleComponent {
  cardViewVisibilty = true;
  showPeopleList = true;
  peoplelist: any[] = [];
  fieldLists: any = {};
  _fieldLists: any[] = [];
  filterDataBy: string;
  socialFilterData: string;

  serverPath: string;


  _provinceLists: any[] = [];
  _districtLists: any[] = [];
  _areaLists: any[] = [];

  _districtBasedOnProvince: any[] = [];
  _areaBasedOnProvince: any[] = [];

  _districtOptionLists: any[] = [];
  _areaOptionLists: any[] = [];

  msgs: Message[] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _managepeopleService: ManagepeopleService,
    private _fieldsService: FieldsService,
    private _CommonDataService: CommonDataService,
    private _configuration: Configuration,
    private _confirmationService: ConfirmationService,
  ) {

    this.serverPath = this._configuration.Server;

    if (_CommonDataService.filterDataBy) {
      this.filterDataBy = _CommonDataService.filterDataBy;
      if (_CommonDataService.filterDataBy === 'province') {
        this.getAllPeopleWithFilter('province', _CommonDataService.filterData);
      } else if (_CommonDataService.filterDataBy === 'social') {
        this.socialFilterData = _CommonDataService.filterData;
        this.getAllPeopleWithFilter('social', _CommonDataService.filterData);
      }
    } else {
      this.getAllPeople();
    }
  }

  ngOnInit() {
    //this.getAllPeople();
    this.getAllFields('people');

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
        this.peoplelist = [];
        if (value == '') {
            this.getAllPeople();
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
                this.getAllPeople();
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
                this.getAllPeople();
            }
        } else {
            this.FilteredUsers('area', value);
        }
        
    }
  
  FilteredUsers(type, value) {
    
    this.peoplelist = [];
    this._managepeopleService
        .GetAll()
        .subscribe( data => {
          this.peoplelist = [];
            data.forEach(element => {
                if (type == 'province') {
                    if (element.person.province == value) {
                        element.person['id'] = element._id;
                        this.peoplelist.push(element.person);
                    }
                }
                if (type == 'district') {
                    if (element.person.district == value) {
                        element.person['id'] = element._id;
                        this.peoplelist.push(element.person);
                    }
                }
                if (type == 'area') {
                    if (element.person.area == value) {
                        element.person['id'] = element._id;
                        this.peoplelist.push(element.person);
                    }
                }
            });
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
        if (this.filterDataBy === 'social') {
          if (this.socialFilterData === 'facebook') {
            this._fieldLists = this._fieldLists.filter(ele => ele.labelname !== 'twitter_url'
              && ele.labelname !== 'telegram_url' && ele.labelname !== 'whatsApp_url');
          } else if (this.socialFilterData === 'twitter') {
            this._fieldLists = this._fieldLists.filter(ele => ele.labelname !== 'facebook_url'
              && ele.labelname !== 'telegram_url' && ele.labelname !== 'whatsApp_url');
          } else if (this.socialFilterData === 'telegram') {
            this._fieldLists = this._fieldLists.filter(ele => ele.labelname !== 'twitter_url'
              && ele.labelname !== 'facebook_url' && ele.labelname !== 'whatsApp_url');
          } else if (this.socialFilterData === 'others') {
            this._fieldLists = this._fieldLists.filter(ele => ele.labelname !== 'twitter_url'
              && ele.labelname !== 'telegram_url' && ele.labelname !== 'facebook_url');
          }
        }
      });
  }

  getAllPeopleWithFilter(filterBy: string, filterData: string) {
    this._managepeopleService
      .GetAllWithFilter(filterBy, filterData)
      .subscribe(
      data => {
        if (data) {
          this.peoplelist = [];
          data.forEach(element => {
            if (element.person) {
              element.person.id = element._id;
              this.peoplelist.push(element.person);
            }
          });
          if (this.peoplelist.length > 0) {
            this.showPeopleList = false;
          } else {
            this.showPeopleList = true;
          }
          //this.cardViewVisibilty = false;
          if (this._CommonDataService.filterDataBy === 'province' || this._CommonDataService.filterDataBy === 'social') {
            this.cardViewVisibilty = false;
          } else {
            this.cardViewVisibilty = true;
          }
          //this._peoplelist = this._peoplelist;
          this._CommonDataService.filterDataBy = '';
          this._CommonDataService.filterData = '';
        }
      });
  }

  getAllPeople() {
    this._managepeopleService
      .GetAll()
      .subscribe(
      data => {
        if (data) {
          this.peoplelist = [];
          data.forEach(element => {
            if (element.person) {
              element.person.id = element._id;
              this.peoplelist.push(element.person);
            }
          });
          if (this.peoplelist.length > 0) {
            this.showPeopleList = false;
          } else {
            this.showPeopleList = true;
          }
        }
      });
  }
  switchView() {
    if (this.cardViewVisibilty) {
      this.cardViewVisibilty = false;
    } else {
      this.cardViewVisibilty = true;
    }
  }
  edit(person: any) {
    this._router.navigate(['/pages/peoples/add-people/form/' + person.id ]);
  }

  delete(person: any) {
    this._confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            this._managepeopleService
              .Delete(person.id)
              .subscribe( data => {
                this.getAllPeople();
                this.msgs = [];
                this.msgs.push({ 
                severity: 'success', 
                summary: 'Delete Message', 
                detail: 'People deleted Successfully!!',
              });
            });
        },
    });
  }
}
