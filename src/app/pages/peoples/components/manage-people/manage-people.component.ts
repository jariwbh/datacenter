import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FieldsService } from '../../../../core/services/dynamic-fields/fields.service';
import { FieldsModel } from '../../../../core/models/dynamic-fields/fields.model';

import { ManagepeopleService } from '../../../../core/services/people/manage-people.service';

import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
@Component({
  selector: 'nga-manage-people',
  templateUrl: './manage-people.html',
})

export class ManagePeopleComponent {
  cardViewVisibilty = true;
  _peoplelist: any[] = [];
  fieldLists: any = {};
  _fieldLists: any[] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _managepeopleService: ManagepeopleService,
    private _fieldsService: FieldsService,
  ) {
    
  }

  ngOnInit() {
    this.getAllPeople();
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
