import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ManagepeopleService } from '../../../../../core/services/people/manage-people.service';

import { ActivityService } from '../../../../../core/services/activity/activity.service';
import { ActivityModel } from '../../../../../core/models/activity/activity.model';

import { FieldsService } from '../../../../../core/services/dynamic-fields/fields.service';
import { FieldsModel } from '../../../../../core/models/dynamic-fields/fields.model';

import { Message } from 'primeng/primeng';
import { AuthService } from '../../../../../core/services/common/auth.service';
import { Configuration } from '../../../../../app.constants';

@Component({
  selector: 'nga-form-activity',
  templateUrl: './form.html',
  styleUrls: ['./grid.scss'],
})

export class FormComponent {

_activityModel = new ActivityModel();

typeForm: FormGroup;
typeSubmitted: boolean;

userSearchForm: FormGroup;
userSearchSubmitted: boolean;

aboutForm: FormGroup;
aboutSubmitted: boolean;

activityTypeVisibilty = true;
howActivityVisibilty = false;
aboutVisibilty = false;

msgs: Message[] = [];
_completedStep = 1;

_allEmails: any [] = [];
filteredEmailsMultiple: any[];

bindId: string;

_provinceLists: any[] = [];
_districtLists: any[] = [];
_areaLists: any[] = [];

_districtBasedOnProvince: any[] = [];
_areaBasedOnProvince: any[] = [];

_districtOptionLists: any[] = [];
_areaOptionLists: any[] = [];

authId: string;
serverPath: string;

constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _activityService: ActivityService,
    private _managepeopleService: ManagepeopleService,
    private _fieldsService: FieldsService,
    private _authService: AuthService,
    private _configuration: Configuration,
  ) { 
    
    this.serverPath = this._configuration.Server;
    
    if (this._authService.auth_id === '') {
      this.authId = null;
    } else {
      this.authId = this._authService.auth_id;
    }

    this.typeForm = fb.group({
        'activitytype': [this._activityModel.activitytype, Validators.required],
    });

    this.userSearchForm = fb.group({
        'persons': [this._activityModel.persons],
        'personsLists': [this._activityModel.personsLists, Validators.required],
    });

    this.aboutForm = fb.group({
        'images': [this._activityModel.images, Validators.required],
        'description': [this._activityModel.description, Validators.required],
        'url': [this._activityModel.url, Validators.required],
        'name': [this._activityModel.name],
    });

    this.getAllPersonrEmail();
  }

  ngOnInit() {
    this._route.params.subscribe(
        (param: any) => {
            this.bindId = param['id'];
    });
    if (this.bindId) {
      this.getActivityById(this.bindId);
    }
  }
  
  

  getActivityById(id: any) {
    this._activityService
      .GetById(id)
      .subscribe(data => {
        if (data) {
          this._activityModel = data;
        }
      });
  }
  getAllPersonrEmail() {
      this._managepeopleService
        .GetAll()
        .subscribe(
        data => {
          data.forEach(element => {
            const id = element._id;
            const email = element.person.email;
            const grp = {
              name: email,
              code: id,
            }; 
            this._allEmails.push(grp);
          });
      });
    }
    filterEmailMultiple(event) {
      const query = event.query;
      this.filteredEmailsMultiple = this.filterEmail(query, this._allEmails);
    }
    
    filterEmail(query, emails: any[]): any[] {
        const filtered: any[] = [];
        emails.forEach(element => {
          const email = element;
          if (email.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(email);
          }
        });
        return filtered;
    }
}
