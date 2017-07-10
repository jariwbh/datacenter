import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FieldsService } from '../../../../core/services/dynamic-fields/fields.service';
import { FieldsModel } from '../../../../core/models/dynamic-fields/fields.model';

import { UsersService } from '../../../../core/services/users/users.service';
import { Configuration } from '../../../../app.constants';

import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'nga-manage-user',
  templateUrl: './manage-user.html',
})

export class ManageUserComponent {

    adminlist: any[] = [];
    fieldLists: any = {};
    _fieldLists: any[] = [];

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
  }
  
  getAllAdmin() {
    this._usersService
      .GetAll()
      .subscribe( data => {
        data.forEach(element => {
          element.admin.id = element._id;
          this.adminlist.push(element.admin);
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
        });
  }

  edit(id: any) {
    console.log(id);
  }

  delete(id: any) {
    this._confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            console.log(id);
        },
    });
  }

}
