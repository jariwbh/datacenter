import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { FieldsService } from '../../../../../core/services/dynamic-fields/fields.service';
import { FieldsModel } from '../../../../../core/models/dynamic-fields/fields.model';

import { UsersService } from '../../../../../core/services/users/users.service';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'nga-add-user-form',
  templateUrl: './form.html',
  styleUrls: ['./grid.scss'],
})

export class FormComponent {
  
  form: FormGroup;
  dynamicForm: FormGroup;
  _fieldsModel = new FieldsModel();
  submitted: boolean;
  dynamicSubmitted: boolean;
  msgs: Message[] = [];
  informationVisibilty = true;
  usernamepasswordVisibilty = false;
  accesscontrolVisibilty = false;

  _lookupVisibiity = false;

  _completedStep = 1;
  _choiceCount = 1;

  fieldLists: any = {};

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

  }
  ngOnInit() {
    this.getAllFields();
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
            this.msgs = [];
            this.msgs.push ({ 
              severity: 'info', summary: 'Insert Message', detail: 'User has been added Successfully!!!' });
            this._completedStep = 2;
            this.informationVisibilty = false;
            this.usernamepasswordVisibilty = true;
            this.accesscontrolVisibilty = false;
            
        });
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
        
        this._fieldsModel.formname = 'admin';
        this._fieldsModel.fieldtype = value.fieldtype;
        this._fieldsModel.lookupdata = value.lookupdata;
        this._fieldsModel.displayname = value.displayname;
        this._fieldsModel.labelname = value.labelname;
        this._fieldsModel.description = value.description;
        this._fieldsModel.formorder = value.formorder;
        this._fieldsModel.issystemfield = false;

        if (value.isMandatory === 0) {
          this._fieldsModel.isMandatory = true;
        } else {
          this._fieldsModel.isMandatory = false;
        }

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
      }
  }

  onChange(newValue: any) {
    if ((newValue === 'List') || (newValue === 'Multi selected List') || (newValue === 'Checkbox')) {
      this._lookupVisibiity = true;
    } else {
      this._lookupVisibiity = false;
    }
  }
  
}
