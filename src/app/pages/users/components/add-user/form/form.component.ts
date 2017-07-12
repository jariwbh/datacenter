import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { FieldsService } from '../../../../../core/services/dynamic-fields/fields.service';
import { FieldsModel } from '../../../../../core/models/dynamic-fields/fields.model';

import { UsersService } from '../../../../../core/services/users/users.service';
import { UsersModel } from '../../../../../core/models/users/users.model';

import { Message } from 'primeng/primeng';
import { AuthService } from '../../../../../core/services/common/auth.service';
import { Configuration } from '../../../../../app.constants';

import {} from '@types/googlemaps';

import { 
          BasicValidators, 
          ValidUrlValidator, 
          OnlyNumberValidator, 
          ValidMobileNumberValidator } from '../../../../../shared/components/basicValidators';

import { ConfirmationService } from 'primeng/primeng';

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

  _provinceListsForCity: any[] = [];
  _provinceLists: any[] = [];
  _districtLists: any[] = [];
  _areaLists: any[] = [];

  _districtBasedOnProvince: any[] = [];
  _areaBasedOnProvince: any[] = [];

  _districtOptionLists: any[] = [];
  _areaOptionLists: any[] = [];

  // Google Map Start
      options: any;
      overlays: any[] = [];
      dialogVisible: any = {};
      errorMap: any = {};
      markerTitle: string;
      selectedPosition: any;
      infoWindow: any;
      draggable: boolean;
  // Google Map End

  errorImage: any = {};

   isidexist: boolean;
   authRole: string;
   authId: string;

   _lookupLists: any[] = [];
   lookupError = false;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fieldsService: FieldsService,
    private _usersService: UsersService,
    private _authService: AuthService,
    private confirmationService: ConfirmationService,
    private _configuration: Configuration) {

      if (this._authService.auth_id === '') {
        this.authId = null;
      } else {
        this.authId = this._authService.auth_id;
      }


      if (this._authService.auth_user.role === '') {
        this.authRole = null;
      } else {
        this.authRole = this._authService.auth_user.role;
      }

    // Default Sub Admin
      this.form = fb.group({
        'id': [this._fieldsModel._id],
        'fieldtype': [this._fieldsModel.fieldtype, Validators.required],
        'lookupdata': [this._fieldsModel.lookupdata],
        'displayname': [this._fieldsModel.displayname, Validators.required],
        'labelname': [this._fieldsModel.labelname],
        'description': [this._fieldsModel.description, Validators.required],
        'isMandatory': [this._fieldsModel.isMandatory, Validators.required],
        'formorder': [this._fieldsModel.formorder, [Validators.required, OnlyNumberValidator.insertonlynumber]],
      });

      this.usernamepasswordForm = fb.group({
        'email': [this._usersModel.email, Validators.compose([Validators.required])],
        'username': [this._usersModel.username, Validators.compose([Validators.required])],
        'password': [this._usersModel.password, Validators.compose([Validators.required])],
      });

      this.controlAccessForm = fb.group({
        'role': [this._usersModel.role],
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

      // Google Map Start
      this.options = {
          center: { lat: 21.1835034, lng: 72.8197083 },
          zoom: 12,
      };
      this.initOverlays();
      this.infoWindow = new google.maps.InfoWindow();
      // Google Map Start
  }
  ngOnInit() {

    //get URLid
    this._route.params.subscribe(
        (param: any) => {
            this.bindId = param['id'];
    });

    this.getAllFields();
    this.getAllProvinceForCityBasedonAdmin();
    this.getAllProvince();
    this.getAllDistrict();
    this.getAllArea();
  }

  getAllProvinceForCityBasedonAdmin() {
    this._fieldsService
      .GetAllProvince()
      .subscribe(
      data => {
        if (this._authService.auth_user.cityRights !== 0) {
          data.forEach(element => {
            this._authService.auth_user.cityRights.forEach(ele => {
              if (element.name == ele) {
                this._provinceListsForCity.push(element);
              }
            });
          });
        } else {
          this._provinceListsForCity  = data;
        }
    });
  }
  getAllProvinceForCity() {
    this._fieldsService
      .GetAllProvince()
      .subscribe(
      data => {
        this._provinceListsForCity  = data;
    });
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
  editFields(id: any) {
    this._fieldsService
          .GetById(id)
          .subscribe(
          data => {
            this._fieldsModel = data;
            if (this._fieldsModel) {
              this._lookupLists = this._fieldsModel.lookupdata;
              //this._sampleJson = JSON.stringify(this._fieldsModel.lookupdata);
              const isButton = <HTMLInputElement> document.getElementById('formfieldButton');
              isButton.click();
            }
        });
  }
  deleteFields(id: any) {

    this.confirmationService.confirm({
          message: 'Do you want to delete this record?',
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
            this._fieldsService
              .Delete(id)
              .subscribe(
              data => {
                this.getAllFields();
                this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
            });
          },
          reject: () => {
              this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
          },
      });

    
  }
  clearFormFields() {
    this._fieldsModel._id = null;
    this._fieldsModel.fieldtype = null;
    this._fieldsModel.lookupdata = null;
    this._fieldsModel.displayname = null;
    this._fieldsModel.labelname = null;
    this._fieldsModel.description = null;
    this._fieldsModel.isMandatory = null;
    this._fieldsModel.formorder = null;
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
              if (element.fieldtype == 'map') {
                 this.overlays[element.labelname] = [];
                 this.dialogVisible[element.labelname] = false;
                 this.errorMap[element.labelname] = false;
              }
              if (element.fieldtype == 'image') {
                this.errorImage[element.labelname] = false;
              }
              if (element.isMandatory) {
                if (element.fieldtype == 'map' || element.fieldtype == 'image') {
                  group[element.labelname] = new FormControl('');
                } else {
                  group[element.labelname] = new FormControl('', Validators.required);
                }
              } else {
                group[element.labelname] = new FormControl('');
              }
            });
            this.dynamicForm = this.fb.group(group);
            if (this.bindId) {
              this.getAdminDetailBasedonID(this.bindId);
            } else {
              this._usersModel.role = true;
            }
        });
  }
  addLookup() {
    
    this.lookupError = false;

    const key = <HTMLInputElement>document.getElementById('lookupKey');
    const keyValue = key.value;
    const val = <HTMLInputElement> document.getElementById('lookupValue');
    const valValue = val.value;

    const uuid = this.uuid();

    const grp = {
      id: uuid,
      key: keyValue,
      value: valValue,
    };
    this._lookupLists.push(grp);
    this._fieldsModel.lookupdata = this._lookupLists;
    key.value = '';
    val.value = '';
  }
  removeLookup(id) {
    this.removeLookupfromArray(id, this._lookupLists);
    this._fieldsModel.lookupdata = this._lookupLists;
  }
  removeLookupfromArray(id: number, array: any) {
    for (const i in array) {
      if (array[i].id == id) {
        array.splice(i, 1);
      }
    }
  }
  uuid() {
    let uuid = '', i, random;
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;

      if (i == 8 || i == 12 || i == 16 || i == 20) {
        uuid += '-'
      }
      uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  }
  getAdminDetailBasedonID(id: any) {
    this._completedStep = 3;
    this.informationVisibilty = true;
    this.usernamepasswordVisibilty = false;
    this.accesscontrolVisibilty = false;

    this._usersService
      .GetById(id)
      .subscribe( data => {
        this.fieldLists.forEach(element => {
          element.value = data.admin[element.labelname];
          this._needToSaveData[element.labelname] = data.admin[element.labelname];
          if (element.labelname == 'province') {
            this.onChangeProvince(data.admin[element.labelname]);
          } else if (element.fieldtype == 'map') {
            if (data.admin[element.labelname]) {
              if (data.admin[element.labelname] !== null) {
                const res = data.admin[element.labelname].split('####');
                this.overlays[element.labelname].push(new google.maps.Marker({ 
                  position: { lat: parseFloat(res[0]), 
                    lng: parseFloat(res[1]) }, 
                    title: this.markerTitle, draggable: this.draggable }));
              }
            }
          }

        });
        if (data.admin.role == 'A') {
          this._usersModel['role'] = true;
        } else {
          this._usersModel['role'] = false;
        }
        this._usersModel['email'] = data.admin.email;
        this._usersModel['username'] = data.admin.username;
        this._usersModel['password'] = data.admin.password;
        this._usersModel['cityRights'] = data.admin.cityRights;
        this._usersModel['acl'] = data.admin.acl;

        this._needToSaveData['email'] = data.admin.email;
        this._needToSaveData['username'] = data.admin.username;
        this._needToSaveData['password'] = data.admin.password;
        this._needToSaveData['cityRights'] = data.admin.cityRights;
        this._needToSaveData['acl'] = data.admin.acl;

        if (data.admin.acl) {
          if (data.admin.acl.length !== 0) {
            data.admin.acl.forEach(element => {
              this.selectedcityRights.push(element);
            });
          }
        }
      });
  }
  onDynamicFormSubmit(value: any, isValid: boolean) {
    this.dynamicSubmitted = true;
      if (!isValid) {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
          return false;
      } else {
        let cnt = 0;
        this.fieldLists.forEach(element => {
          if (element.fieldtype == 'checkbox') {
            value[element.labelname] = [];
            let cnt = 0;
            element.lookupdata.forEach(ele => {
              const isChecked = <HTMLInputElement> document.getElementById('check_' + element.labelname + '_' + cnt);
              const grp = {
                value: ele.value,
                key: ele.key,
                check: isChecked.checked,
              };
              value[element.labelname].push(grp);
              
              cnt++;
            });
          }
          if (element.fieldtype == 'map') {
            const isMap = <HTMLInputElement> document.getElementById('map_' + element.labelname);
            value[element.labelname] = isMap.value;
            
            if (element.isMandatory) {
              if (value[element.labelname] == '') {
                this.errorMap[element.labelname] = true;
                cnt++;
              }
            }
          }
          if (element.fieldtype == 'image') {
            const isImage = <HTMLInputElement> document.getElementById('image_' + element.labelname);
            value[element.labelname] = isImage.value;
            
            if (element.isMandatory) {
              if (value[element.labelname] == '') {
                this.errorImage[element.labelname] = true;
                cnt++;
              }
            }
          }
        });
        if (cnt == 0) {
            if (!this.bindId) {
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
            } else {
              if (this._usersModel.role) {
                value.role = 'A';
              } else {
                value.role = 'S';
              }
              value.email = this._usersModel['email'];
              value.username = this._usersModel['username'];
              value.password = this._usersModel['password'];
              value.cityRights = this._usersModel['cityRights'];
              value.acl = this._usersModel['acl'];
              this._usersService
                .Update(this.bindId, value)
                .subscribe(
                data => {
                  if (data) {
                    this._needToSaveData = data['admin'];
                    this.bindId = data._id;
                  }
                  this.msgs = [];
                  this.msgs.push ({ 
                    severity: 'info', summary: 'Update Message', detail: 'Admin has been Updated Successfully!!!' });
                    this._completedStep = 3;
                  this.informationVisibilty = false;
                  this.usernamepasswordVisibilty = true;
                  this.accesscontrolVisibilty = false;
              });
            }
        }
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
          if (value.role) {
            this._needToSaveData['role'] = 'A';
          } else {
            this._needToSaveData['role'] = 'S';
          }
          this._needToSaveData['acl'] = this.selectedcityRights;
          this._needToSaveData['cityRights'] = value.cityRights;
          this._usersService
            .Update(this.bindId, this._needToSaveData)
            .subscribe(
            data => {
              this.msgs = [];
              this.msgs.push ({ 
                severity: 'info', summary: 'Insert Message', detail: 'Admin has been Updated Successfully!!!' });
              this._router.navigate(['/pages/users/manage-user']);
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
      
      setTimeout(() => { 
           this.selectedcityRights.forEach(element => {
              if (element == 'Create a new admin') {
                const isChecked = <HTMLInputElement> document.getElementById('acl_0');
                isChecked.checked = true;
              }
              if (element == 'Create a new person') {
                const isChecked = <HTMLInputElement> document.getElementById('acl_1');
                isChecked.checked = true;
              }
              if (element == 'Create a new activity') {
                const isChecked = <HTMLInputElement> document.getElementById('acl_2');
                isChecked.checked = true;
              }
              if (element == 'View User History') {
                const isChecked = <HTMLInputElement> document.getElementById('acl_3');
                isChecked.checked = true;
              }
              if (element == 'View report page') {
                const isChecked = <HTMLInputElement> document.getElementById('acl_4');
                isChecked.checked = true;
              }
              if (element == 'View Manage person page') {
                const isChecked = <HTMLInputElement> document.getElementById('acl_5');
                isChecked.checked = true;
              }
            }); 
      }, 1000);
    }
  }

  onSubmit(value: any, isValid: boolean) {
      this.submitted = true;
      if (!isValid) {
          return false;
      } else {

        if (this._fieldsModel._id == null) {
            this._fieldsModel._id = (function () { return undefined; })();
        }

        if (this._fieldsModel._id) {
          this.isidexist = true;
        } else {
          this.isidexist = false;
        }
        if (value.lookupdata) {
          if (value.lookupdata.length == 0) {
            this.lookupError = true;
          }
        }
        const editedLabel = value.displayname.replace(/ /g, '_').toLowerCase() + this.uuid();
        this._fieldsModel.formname = 'admin';
        this._fieldsModel.fieldtype = value.fieldtype;
        this._fieldsModel.lookupdata = value.lookupdata;
        this._fieldsModel.displayname = value.displayname;
        this._fieldsModel.labelname = editedLabel;
        this._fieldsModel.description = value.description;
        this._fieldsModel.formorder = value.formorder;
        this._fieldsModel.issystemfield = false;
        if (value.isMandatory === 0) {
          this._fieldsModel.isMandatory = true;
        } else {
          this._fieldsModel.isMandatory = false;
        }

        if (!this.lookupError) {
            if (this.isidexist) {
                this._fieldsService
                    .Update(this._fieldsModel._id, this._fieldsModel)
                    .subscribe(
                    data => {
                      const isClosed = <HTMLInputElement> document.getElementById('closeAddFields');
                      if (isClosed) {
                        isClosed.click();
                        this.getAllFields();
                        this.clearFormFields();
                        this.msgs = [];
                        this.msgs.push ({ 
        severity: 'info', summary: 'Update Message', detail: 'Fields has been Updated Successfully!!!' });
                        
                      }
                  });
              } else {
                //this.checkLabelNameAlreayExistsOrNot(this._fieldsModel.labelname);
                this._fieldsService
                  .Add(this._fieldsModel)
                  .subscribe(
                  data => {
                    const isClosed = <HTMLInputElement> document.getElementById('closeAddFields');
                    if (isClosed) {
                      isClosed.click();
                      this.getAllFields();
                      this.clearFormFields();
                              this.msgs = [];
                              this.msgs.push ({ 
      severity: 'info', summary: 'Insert Message', detail: 'Fields has been added Successfully!!!' });
                      
                    }
                });
              }
        }
      }
  }
  labelvaluechange() {
    this.labelnameVisibility = false;
  }
  // checkLabelNameAlreayExistsOrNot(labelname) {
  //   this._fieldsService
  //       .GetAll('admin')
  //       .subscribe(
  //       data => {
  //         let cnt = 0;
  //         data.forEach(element => {
  //           if (element.labelname == labelname) {
  //             cnt++;
  //           }
  //         });
  //         if (cnt === 0 ) {
  //             this._fieldsService
  //               .Add(this._fieldsModel)
  //               .subscribe(
  //               data => {
  //                 const isClosed = <HTMLInputElement> document.getElementById('closeAddFields');
  //                 if (isClosed) {
  //                   isClosed.click();
  //                   this.getAllFields();
  //                   this.clearFormFields();
  //                           this.msgs = [];
  //                           this.msgs.push ({ 
  //   severity: 'info', summary: 'Insert Message', detail: 'Fields has been added Successfully!!!' });
                    
  //                 }
  //             });
  //         } else {

  //         this.msgs = [];
  //         this.msgs.push ({ 
  //                 severity: 'error', summary: 'Error  Message', detail: 'Label Name Already Exist.!!!' });
  //         this.labelnameVisibility = true;

  //         }
  //       });
  // }

  onUploadPhoto(event, val) {
      this.errorImage[val] = false;
      const url = event.xhr.response;
      const isImageValue = <HTMLInputElement> document.getElementById('image_' + val);
      isImageValue.value = url;
      const ispath = <HTMLInputElement> document.getElementById('imagePath_' + val);
      ispath.src = this._configuration.Server + url;
  }

  removeImage(val) {
    const isImageValue = <HTMLInputElement> document.getElementById('image_' + val);
    isImageValue.value = '';
    const ispath = <HTMLInputElement> document.getElementById('imagePath_' + val);
    ispath.src = '';
  }
  
  onChange(newValue: any) {
    if ((newValue === 'list') || (newValue === 'multi_selected_list') || (newValue === 'checkbox')) {
      this._lookupVisibiity = true;
    } else {
      this._lookupVisibiity = false;
    }
  }
  
  // Google Map Start
    handleMapClick(event, val) {
      this.errorMap[val] = false;
      if (this.overlays[val].length == 0) {
        this.dialogVisible[val] = true;
        this.selectedPosition = event.latLng;
      }
    }
    handleOverlayClick(event) {
        this.msgs = [];
        const isMarker = event.overlay.getTitle !== undefined;
        if (isMarker) {
            const title = event.overlay.getTitle();
            this.infoWindow.setContent('' + title + '');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());
            this.msgs.push({ severity: 'info', summary: 'Marker Selected', detail: title });
        } else {
            this.msgs.push({ severity: 'info', summary: 'Shape Selected', detail: '' });
        }        
    }
    
    addMarker(id) {
        this.overlays[id].push(new google.maps.Marker({ 
            position: { lat: this.selectedPosition.lat(), 
              lng: this.selectedPosition.lng() }, 
              title: this.markerTitle, draggable: this.draggable }));
          this.markerTitle = null;
          this.dialogVisible[id] = false;
          const mapValue = this.selectedPosition.lat() + '####' + this.selectedPosition.lng();
          const isClosed = <HTMLInputElement> document.getElementById('map_' + id);
          isClosed.value = mapValue;

    }
    handleDragEnd(event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Marker Dragged', detail: event.overlay.getTitle() });
    }
    
    initOverlays() {
        if (!this.overlays || !this.overlays.length) {
            this.overlays = [
                new google.maps.Marker({ position: { lat: 36.879466, lng: 30.667648 }, title: 'Konyaalti' }),
                new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: 'Ataturk Park' }),
                new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: 'Oldtown' }),
                new google.maps.Polygon({paths: [
                    { lat: 36.9177, lng: 30.7854 },
                    { lat: 36.8851, lng: 30.7802 },
                    { lat: 36.8829, lng: 30.8111 },
                    { lat: 36.9177, lng: 30.8159 },
                ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35,
                }),
                new google.maps.Circle({ 
                  center: 
                    { lat: 36.90707, lng: 30.56533 }, 
                  fillColor: '#1976D2', 
                  fillOpacity: 0.35, 
                  strokeWeight: 1, 
                  radius: 1500 }),
                new google.maps.Polyline({ 
                  path: 
                  [
                    { lat: 36.86149, lng: 30.63743 },
                    { lat: 36.86341, lng: 30.72463 },
                  ], 
                  geodesic: true, 
                  strokeColor: '#FF0000', 
                  strokeOpacity: 0.5, 
                  strokeWeight: 2 }),
            ];
        }
    }
    zoomIn(map) {
      map.setZoom(map.getZoom() + 1);
    }
    
    zoomOut(map) {
      map.setZoom(map.getZoom() - 1);
    }
    
    clear(id) {
      this.overlays[id] = [];
    }
  // Google Map Map
  
}
