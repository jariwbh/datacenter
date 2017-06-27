import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { FieldsService } from '../../../../../core/services/dynamic-fields/fields.service';
import { FieldsModel } from '../../../../../core/models/dynamic-fields/fields.model';

import { UsersService } from '../../../../../core/services/users/users.service';
import { UsersModel } from '../../../../../core/models/users/users.model';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'nga-add-user-form',
  templateUrl: './form.html',
  styleUrls: ['./grid.scss'],
})

export class FormComponent {
  usernamepasswordsubmitted: boolean;
  bindId: number;
  form: FormGroup;
  dynamicForm: FormGroup;
  usernamepasswordForm: FormGroup;
  controlAccessForm: FormGroup;
  _fieldsModel = new FieldsModel();
  _usersModel = new UsersModel();
  submitted: boolean;
  dynamicSubmitted: boolean;
  controlAccessSubmitted: boolean;
  usernamepasswordSubmitted: boolean;
  msgs: Message[] = [];
  informationVisibilty = true;
  usernamepasswordVisibilty = false;
  accesscontrolVisibilty = false;

  _lookupVisibiity = false;

  labelnameVisibility = false;

  _completedStep = 1;
  _choiceCount = 1;

  fieldLists: any = {};
  _needToSaveData: any = {};

  cityRights: any = [];
  selectedcityRights: any = [];
  aclVisibility = false;

  _sampleJson: string;

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
    private _fieldsService: FieldsService,
    private _usersService: UsersService) {
      
      this.form = fb.group({
        'fieldtype': [this._fieldsModel.fieldtype, Validators.required],
        'lookupdata': [this._fieldsModel.lookupdata],
        'displayname': [this._fieldsModel.displayname],
        'labelname': [this._fieldsModel.labelname, Validators.required],
        'description': [this._fieldsModel.description, Validators.required],
        'isMandatory': [this._fieldsModel.isMandatory, Validators.required],
        'formorder': [this._fieldsModel.formorder, Validators.required],
      });

      this.usernamepasswordForm = fb.group({
        'email': [this._usersModel.email, Validators.compose([Validators.required])],
        'username': [this._usersModel.username, Validators.compose([Validators.required])],
        'password': [this._usersModel.password, Validators.compose([Validators.required])],
      });

      this.controlAccessForm = fb.group({
        'acl': [this._usersModel.acl],
        'cityRights': [this._usersModel.cityRights, Validators.required],
      });

      this.cityRights[0] = 'Create a new admin';
      this.cityRights[1] = 'Create a new person';
      this.cityRights[2] = 'Create a new activity';
      this.cityRights[3] = 'View User History';
      this.cityRights[4] = 'View report page';
      this.cityRights[5] = 'View Manage person page';

      // Made Sample Json Data For Lookup
      this._sampleJson = `[
          {
              "key": "gujarat",
              "value": "gujarat"
          },
          {
              "key": "Mumbai",
              "value": "Mumbai"
          },
          {
              "key": "Up",
              "value": "UP"
          },
          {
              "key": "MP",
              "value": "MP"
          }
      ]`;
      // Made Sample Json Data For Lookup
  }
  ngOnInit() {
    this.getAllFields();
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
  categoryChange(evt: any) {
    this.aclVisibility = false;
    const target = evt.target;
    // Checke Checkbox Checked or not.
    if (target.checked) {
      this.selectedcityRights.push(target.value);
    } else {
      this.removeCategory(target.value, this.selectedcityRights);
    }
  }
  removeCategory(id: number, array: any) {
    for (const i in array) {
      if (array[i] === id) {
        array.splice(i, 1);
      }
    }
  }
  getAllFields() {
    this._fieldsService
          .GetAll('admin')
          .subscribe(
          data => {
            this.fieldLists = data;
            const group: any = {};
            data.forEach(element => {
              if (element.isMandatory) {
                group[element.labelname] = new FormControl('', Validators.required);
              } else {
                group[element.labelname] = new FormControl('');
              }
            });
            this.dynamicForm = this.fb.group(group);
        });
  }

  onDynamicFormSubmit(value: any, isValid: boolean) {
    this.dynamicSubmitted = true;
      if (!isValid) {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
          return false;
      } else {
        this._usersService
          .Add(value)
          .subscribe(
          data => {
            if (data) {
              this._needToSaveData = data['admin'];
              this.bindId = data._id;
            }
            this.msgs = [];
            this.msgs.push ({ 
              severity: 'info', summary: 'Insert Message', detail: 'Admin has been added Successfully!!!' });
            this._completedStep = 2;
            this.informationVisibilty = false;
            this.usernamepasswordVisibilty = true;
            this.accesscontrolVisibilty = false;
        });
      }
  }
  onUsernamepasswordSubmit(value: any, isValid: boolean) {
    this.usernamepasswordsubmitted = true;
      if (!isValid) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
        return false;
      } else {
        this._needToSaveData['email'] = value.email;
        this._needToSaveData['username'] = value.username;
        this._needToSaveData['password'] = value.password;
        this._usersService
          .Update(this.bindId, this._needToSaveData)
          .subscribe(
          data => {
            if (data) {
              this._needToSaveData = data['admin'];
              this.bindId = data._id;
            }
            this.msgs = [];
            this.msgs.push ({ 
              severity: 'info', summary: 'Insert Message', detail: 'Admin has been Updated Successfully!!!' });
            this._completedStep = 3;
            this.informationVisibilty = false;
            this.usernamepasswordVisibilty = false;
            this.accesscontrolVisibilty = true;
        });
      }
  }
  controlAccessonSubmit(value: any, isValid: boolean) {
    this.usernamepasswordsubmitted = true;
      if (!isValid) {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
        return false;
      } else {
        if (this.selectedcityRights.length == 0) {
          this.aclVisibility = true;
        } else {
          this.aclVisibility = false;
          this._needToSaveData['acl'] = this.selectedcityRights;
          this._needToSaveData['cityRights'] = value.cityRights;
          this._usersService
            .Update(this.bindId, this._needToSaveData)
            .subscribe(
            data => {
              this.msgs = [];
              this.msgs.push ({ 
                severity: 'info', summary: 'Insert Message', detail: 'Admin has been Updated Successfully!!!' });
              this._completedStep = 1;
              this.informationVisibilty = true;
              this.usernamepasswordVisibilty = false;
              this.accesscontrolVisibilty = false;
              
              this.getAllFields();
          });
        }
      }
  }
  switchbox(value: any) {
    if (value === 'information') {
      if (this._completedStep < 1) {
        this._completedStep = 1;
      }
      this.informationVisibilty = true;
      this.usernamepasswordVisibilty = false;
      this.accesscontrolVisibilty = false;
    } else if (value === 'usernamepassword') {
      if (this._completedStep < 2) {
        this._completedStep = 2;
      }
      this.informationVisibilty = false;
      this.usernamepasswordVisibilty = true;
      this.accesscontrolVisibilty = false;
    } else if (value === 'controlaccess') {
      if (this._completedStep < 3) {
        this._completedStep = 3;
      }
      this.informationVisibilty = false;
      this.usernamepasswordVisibilty = false;
      this.accesscontrolVisibilty = true;
    }
  }

  onSubmit(value: any, isValid: boolean) {
      this.submitted = true;
      if (!isValid) {
          return false;
      } else {
        let lookupJson = [];
        if (value.lookupdata) {
          lookupJson = JSON.parse(value.lookupdata);
        }
        const editedLabel = value.labelname.replace(/ /g, '_');
        this._fieldsModel.formname = 'admin';
        this._fieldsModel.fieldtype = value.fieldtype;
        this._fieldsModel.lookupdata = lookupJson;
        this._fieldsModel.displayname = value.displayname;
        this._fieldsModel.labelname = editedLabel.toLowerCase();
        this._fieldsModel.description = value.description;
        this._fieldsModel.formorder = value.formorder;
        this._fieldsModel.issystemfield = false;

        if (value.isMandatory === 0) {
          this._fieldsModel.isMandatory = true;
        } else {
          this._fieldsModel.isMandatory = false;
        }
        this.checkLabelNameAlreayExistsOrNot(this._fieldsModel.labelname);
      }
  }
  labelvaluechange() {
    this.labelnameVisibility = false;
  }
  checkLabelNameAlreayExistsOrNot(labelname) {
    this._fieldsService
        .GetAll('admin')
        .subscribe(
        data => {
          let cnt = 0;
          data.forEach(element => {
            if (element.labelname == labelname) {
              cnt++;
            }
          });
          if (cnt === 0 ) {
            this._fieldsService
              .Add(this._fieldsModel)
              .subscribe(
              data => {
                const isClosed = <HTMLInputElement> document.getElementById('closeAddFields');
                if (isClosed) {
                  isClosed.click();
                  this.getAllFields();
                  this.form.reset();
                          this.msgs = [];
                          this.msgs.push ({ 
  severity: 'info', summary: 'Insert Message', detail: 'Fields has been added Successfully!!!' });
                  
                }
            });

          } else {

            this.msgs = [];
          this.msgs.push ({ 
                  severity: 'error', summary: 'Error  Message', detail: 'Label Name Already Exist.!!!' });
          this.labelnameVisibility = true;

          }
        });
  }
  onChange(newValue: any) {
    if ((newValue === 'list') || (newValue === 'multi_selected_list') || (newValue === 'checkbox')) {
      this._lookupVisibiity = true;
    } else {
      this._lookupVisibiity = false;
    }
  }
  
}
