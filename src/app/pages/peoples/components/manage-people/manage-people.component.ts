import { CommonDataService } from './../../../../core/services/common/common-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FieldsService } from '../../../../core/services/dynamic-fields/fields.service';
import { FieldsModel } from '../../../../core/models/dynamic-fields/fields.model';

import { ManagepeopleService } from '../../../../core/services/people/manage-people.service';

import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { Configuration } from '../../../../app.constants';

@Component({
  selector: 'nga-manage-people',
  templateUrl: './manage-people.html',
  styleUrls: ['./manage-people.scss'],
})

export class ManagePeopleComponent {
  cardViewVisibilty = true;
  showPeopleList = true;
  _peoplelist: any[] = [];
  fieldLists: any = {};
  _fieldLists: any[] = [];

  serverPath: string;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _managepeopleService: ManagepeopleService,
    private _fieldsService: FieldsService,
    private _CommonDataService: CommonDataService,
    private _configuration: Configuration,
  ) {
    
    this.serverPath = this._configuration.Server;

    if (_CommonDataService.filterDataBy) {
      // debugger;
      if ( _CommonDataService.filterDataBy === 'province') {
       // debugger;
        this.getAllPeopleWithFilter('province', _CommonDataService.filterData );
      } else if ( _CommonDataService.filterDataBy === 'social' ) {
       // debugger;
        this.getAllPeopleWithFilter('social', _CommonDataService.filterData );
      }
          
    } else {
     // debugger;
        this.getAllPeople();
        // this.cardViewVisibilty = true;
    }
  }

  ngOnInit() {
    //this.getAllPeople();
    this.getAllFields('people');
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

  getAllPeopleWithFilter( filterBy: string, filterData: string) {
      this._managepeopleService
          .GetAllWithFilter(filterBy, filterData)
          .subscribe(
          data => {
            if (data) {
              data.forEach(element => {
                if (element.person) {
                  this._peoplelist.push(element.person);
                }
              });
              if (this._peoplelist.length > 0) {
                this.showPeopleList = false;
              } else {
                this.showPeopleList = true;
              }
              //this.cardViewVisibilty = false;
              if(this._CommonDataService.filterDataBy === 'province' || this._CommonDataService.filterDataBy === 'social') {
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
              data.forEach(element => {
                if (element.person) {
                  this._peoplelist.push(element.person);
                }
              });
               if (this._peoplelist.length > 0) {
                this.showPeopleList = false;
              } else {
                this.showPeopleList = true;
              }
            }
        });
  }
  switchView() {
    if ( this.cardViewVisibilty ) {
      this.cardViewVisibilty = false;
    } else {
      this.cardViewVisibilty = true;
    }
  }
}
