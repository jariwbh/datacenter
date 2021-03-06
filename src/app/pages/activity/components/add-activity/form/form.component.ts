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

_imageLists: any [] = [];

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
    //get URLid
    this._route.params.subscribe(
        (param: any) => {
            this.bindId = param['id'];
    });
    this.getAllProvince();
    this.getAllDistrict();
    this.getAllArea();
    if (this.bindId) {
      this.getActivityById(this.bindId);
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
      this._districtOptionLists = [];
      this._areaOptionLists = [];

      this._districtOptionLists = this._districtBasedOnProvince[value];
      this._areaOptionLists = this._areaBasedOnProvince[value];
  }

  getActivityById(id: any) {
    this._activityService
      .GetById(id)
      .subscribe(data => {
        if (data) {
          this._activityModel = data;
          this._imageLists = this._activityModel.images;
          this._completedStep = 3;
          this.activityTypeVisibilty = false;
          this.howActivityVisibilty = false;
          this.aboutVisibilty = true;
        }
      });
  }
  removeImage(id) {
    this.removeSeletectdImage(id, this._imageLists);
  }

  removeSeletectdImage(id: number, array: any) {
    for (let i in array) {
      if (array[i].id == id) {
        array.splice(i, 1);
      }
    }
  }
  onUploadPhoto(event) {
      const url = event.xhr.response;
      let uuid = this.uuid();
      let grp = {
        id: uuid,
        imagevalue: url,
      };
      this._imageLists.push(grp);
      this._activityModel.images = this._imageLists;
  }

  uuid() {
    let uuid = "", i, random;
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;

      if (i == 8 || i == 12 || i == 16 || i == 20) {
        uuid += "-"
      }
      uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  }

  onTypeSubmit(value: any, isValid: boolean) {
    this.typeSubmitted = true;
      if (!isValid) {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
          return false;
      } else {
        this._activityModel.activitytype = value.activitytype;
        this.msgs = [];
        this.msgs.push ({ 
          severity: 'info', summary: 'Insert Message', detail: 'Activity has been added Successfully!!!' });
        this._completedStep = 2;
        this.activityTypeVisibilty = false;
      this.howActivityVisibilty = true;
      this.aboutVisibilty = false;
      }
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

  onUserSearchSubmit(value: any, isValid: boolean) {
    this.userSearchSubmitted = true;
      if (!isValid) {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
          return false;
      } else {
        if (value.personsLists.length !== 0) {
          this._activityModel.persons = [];
          value.personsLists.forEach(element => {
            this._activityModel.persons.push(element.code);
          });
          this.msgs = [];
          this.msgs.push ({ 
            severity: 'info', summary: 'Insert Message', detail: 'Activity has been added Successfully!!!' });
          this._completedStep = 3;
          this.activityTypeVisibilty = false;
          this.howActivityVisibilty = false;
          this.aboutVisibilty = true;
        }
        
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
        if (this.authId) {
          if (this.bindId) {
            this._activityService
              .Update(this.bindId, this._activityModel)
              .subscribe(data => {
                this.msgs = [];
                this.msgs.push ({ 
                  severity: 'info', 
                  summary: 'Update Message', 
                  detail: 'Activity has been Updated Successfully!!!' });
                this._router.navigate(['/pages/activities/manage-activity']);
            });
          } else {
            this._activityService
              .Add(this.authId, this._activityModel)
              .subscribe(data => {
                this.msgs = [];
                this.msgs.push ({ 
                  severity: 'info', summary: 'Insert Message', detail: 'Activity has been added Successfully!!!' });
                this._router.navigate(['/pages/activities/manage-activity']);
            });
          }
        }
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
