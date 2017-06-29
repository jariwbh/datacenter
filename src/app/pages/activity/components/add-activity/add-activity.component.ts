import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { UsersService } from '../../../../core/services/users/users.service';

import { ActivityService } from '../../../../core/services/activity/activity.service';
import { ActivityModel } from '../../../../core/models/activity/activity.model';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'nga-add-activity',
  templateUrl: './add-activity.html',
  styleUrls: ['./grid.scss'],
})

export class AddActivityComponent {

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
msgs="";

msgs: Message[] = [];
_completedStep = 1;

_allEmails: any [] = [];
filteredEmailsMultiple: any[];

constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _activityService: ActivityService,
    private _usersService: UsersService,
  ) {

    this.typeForm = fb.group({
        'type': [this._activityModel.type, Validators.required],
    });

    this.userSearchForm = fb.group({
        'persons': [this._activityModel.persons, Validators.required],
    });

    this.aboutForm = fb.group({
        'description': [this._activityModel.description, Validators.required],
        'url': [this._activityModel.url, Validators.required],
        'name': [this._activityModel.name],
    });

    this.getAllUserEmail();
  }
  
  onUploadPhoto(event) {
      console.log('here');
      const url = event.xhr.response;
      console.log(url);
  }

  onTypeSubmit(value: any, isValid: boolean) {
    this.typeSubmitted = true;
      if (!isValid) {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
          return false;
      } else {
        this._activityModel.type = value.type;
        this.msgs = [];
        this.msgs.push ({ 
          severity: 'info', summary: 'Insert Message', detail: 'Activity has been added Successfully!!!' });
        this._completedStep = 2;
        this.activityTypeVisibilty = false;
      this.howActivityVisibilty = true;
      this.aboutVisibilty = false;
      }
  }

  getAllUserEmail() {
      this._usersService
        .GetAll()
        .subscribe(
        data => {
          data.forEach(element => {
            const id = element._id;
            const email = element.admin.email;
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

  onUserSearchSubmit(value: any, isValid: boolean) {
    this.userSearchSubmitted = true;
      if (!isValid) {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
          return false;
      } else {
        this._activityModel.persons = value.persons;
        this.msgs = [];
        this.msgs.push ({ 
          severity: 'info', summary: 'Insert Message', detail: 'Activity has been added Successfully!!!' });
        this._completedStep = 3;
        this.activityTypeVisibilty = false;
        this.howActivityVisibilty = false;
        this.aboutVisibilty = true;
      }
  }

  onAboutSubmit(value: any, isValid: boolean) {
    this.aboutSubmitted = true;
      if (!isValid) {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
          return false;
      } else {
        this._activityModel.description = value.description;
        this._activityModel.url = value.url;
        this._activityModel.name = value.name;
        this._activityService
          .Add(this._activityModel)
          .subscribe(data => {
            this.msgs = [];
            this.msgs.push ({ 
              severity: 'info', summary: 'Insert Message', detail: 'Activity has been added Successfully!!!' });
            this._router.navigate(['/pages/activities/manage-activity']);
        });
      }
  }

switchbox(value: any) {
    if (value === 'activityType') {
      
      if (this._completedStep < 1) {
        this._completedStep = 1;
      }
      this.activityTypeVisibilty = true;
      this.howActivityVisibilty = false;
      this.aboutVisibilty = false;
    } else if (value === 'howActivity') {
      if (this._completedStep < 2) {
        this._completedStep = 2;
      }
      this.activityTypeVisibilty = false;
      this.howActivityVisibilty = true;
      this.aboutVisibilty = false;
    } else if (value === 'about') {
      if (this._completedStep < 3) {
        this._completedStep = 3;
      }
      this.activityTypeVisibilty = false;
      this.howActivityVisibilty = false;
      this.aboutVisibilty = true;
    }
  }

}
