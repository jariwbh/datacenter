import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { FieldsService } from '../../../../../core/services/dynamic-fields/fields.service';
import { FieldsModel } from '../../../../../core/models/dynamic-fields/fields.model';

import { ManagepeopleService } from '../../../../../core/services/people/manage-people.service';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'nga-add-people-form',
  templateUrl: './form.html',
})

export class FormComponent {
  
  form: FormGroup;
  dynamicForm: FormGroup;
  _fieldsModel = new FieldsModel();
  submitted: boolean;
  dynamicSubmitted: boolean;
  msgs: Message[] = [];
  _lookupVisibiity = false;
  labelnameVisibility = false;
  fieldLists: any = {};

  _sampleJson: string;
  uploadedFiles: any[] = [];

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
    private _managepeopleService: ManagepeopleService,
  ) {
    this.form = fb.group({
        'fieldtype': [this._fieldsModel.fieldtype, Validators.required],
        'lookupdata': [this._fieldsModel.lookupdata],
        'displayname': [this._fieldsModel.displayname],
        'labelname': [this._fieldsModel.labelname, Validators.required],
        'description': [this._fieldsModel.description, Validators.required],
        'isMandatory': [this._fieldsModel.isMandatory, Validators.required],
        'isDisplayOnList': [this._fieldsModel.isDisplayOnList, Validators.required],
        'formorder': [this._fieldsModel.formorder, Validators.required],
    });

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
  getAllFields() {
    this._fieldsService
          .GetAll('people')
          .subscribe(
          data => {
            this.fieldLists = data;
            console.log(this.fieldLists);
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
  onChangeProvince(value: any) {
      this._districtOptionLists = [];
      this._areaOptionLists = [];

      this._districtOptionLists = this._districtBasedOnProvince[value];
      this._areaOptionLists = this._areaBasedOnProvince[value];
  }
  onDynamicFormSubmit(value: any, isValid: boolean) {
    this.dynamicSubmitted = true;
      if (!isValid) {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
          return false;
      } else {
        this._managepeopleService
          .Add(value)
          .subscribe(
          data => {
            this.msgs = [];
            this.msgs.push ({ 
              severity: 'info', summary: 'Insert Message', detail: 'People has been added Successfully!!!' });
            this._router.navigate(['/pages/peoples/manage-people']);
        });
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
        this._fieldsModel.formname = 'people';
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

        if (value.isDisplayOnList === 0) {
          this._fieldsModel.isDisplayOnList = true;
        } else {
          this._fieldsModel.isDisplayOnList = false;
        }
        this.checkLabelNameAlreayExistsOrNot(this._fieldsModel.labelname);
      }
  }
  
  labelvaluechange() {
    this.labelnameVisibility = false;
  }

  checkLabelNameAlreayExistsOrNot(labelname) {
    this._fieldsService
        .GetAll('people')
        .subscribe(
        data => {
          let cnt = 0;
          data.forEach(element => {
            if (element.labelname == labelname) {
              cnt++;
            }
          });
          if (cnt === 0) {
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

   onBasicUploadAuto(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }

  onChange(newValue: any) {
    if ((newValue === 'list') || (newValue === 'multi_selected_list') || (newValue === 'checkbox')) {
      this._lookupVisibiity = true;
    } else {
      this._lookupVisibiity = false;
    }
  }
}
