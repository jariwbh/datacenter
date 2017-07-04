
import { forEach } from '@angular/router/src/utils/collection';

import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SettingsService } from './../../core/services/settings/settings.service';
import {
  AreaCountModel, DistrictCountModel,
  SettingModel, SocialCountModel, ProvinceCountModel,
} from './../../core/models/settings/settings.model';

import { AuthService } from './../../core/services/common/auth.service';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'settings',
  templateUrl: './settings.html',
})
export class Settings {
  formProvinceCount: FormGroup;
  formAreaCount: FormGroup;
  formDistrictCount: FormGroup;
  formSetting: FormGroup;
  msgs: Message[] = [];

  provinceList: any[];
  districtList: any[] = [];

  areaList: any[] = [];

  districtListforDD: any[] = [];
  areaListforDD: any[] = [];

  provinceCountSettingsList: any[] = [];
  districtCountSettingsList: any[] = [];
  areaCountSettingsList: any[] = [];

  _SettingModel: SettingModel = new SettingModel();
  _ProvinceCountModel: ProvinceCountModel = new ProvinceCountModel();
  _AreaCountModel: AreaCountModel = new AreaCountModel();
  _DistrictCountModel: DistrictCountModel = new DistrictCountModel();


  constructor(fb: FormBuilder,
    private _router: Router,
    private _Settings: SettingsService,
    private _AuthService: AuthService) {
    this._SettingModel.userCountofSocial = new SocialCountModel();
    this._SettingModel.noOfUserInSocial = [];
    this.getAllProvince();
    this.getAllDistrict();
    this.getAllArea();
    this.formProvinceCount = fb.group({
      'province': [this._ProvinceCountModel.province, [Validators.required]],
      'count': [this._ProvinceCountModel.count, [Validators.required]],
    });
    this.formDistrictCount = fb.group({
      'province': [this._DistrictCountModel.province, [Validators.required]],
      'district': [this._DistrictCountModel.district, [Validators.required]],
      'count': [this._DistrictCountModel.count, [Validators.required]],
    });
    this.formAreaCount = fb.group({
      'province': [this._AreaCountModel.province, [Validators.required]],    
      'area': [this._AreaCountModel.area, [Validators.required]],
      'count': [this._AreaCountModel.count, [Validators.required]],
    });
    this.formSetting = fb.group({
      'facebookUserCount': [this._SettingModel.userCountofSocial.facebookUserCount, [Validators.required]],
      'twitterUserCount': [this._SettingModel.userCountofSocial.twitterUserCount, [Validators.required]],
      'whatsAppUserCount': [this._SettingModel.userCountofSocial.whatsAppUserCount, [Validators.required]],
      'telegramUserCount': [this._SettingModel.userCountofSocial.telegramUserCount, [Validators.required]],
      'noOfUsers': [this._SettingModel.noOfUsers, [Validators.required]],
      'addPersonPointsAdmin': [this._SettingModel.addPersonPointsAdmin, [Validators.required]],
      'addPointPointsAdmin': [this._SettingModel.addPointPointsAdmin, [Validators.required]],
      'addActivityPointsAdmin': [this._SettingModel.addActivityPointsAdmin, [Validators.required]],
      'addhashtagPoints': [this._SettingModel.addhashtagPoints, [Validators.required]],
      'addfacebookPoints': [this._SettingModel.addfacebookPoints, [Validators.required]],
      'addtelegramPoints': [this._SettingModel.addtelegramPoints, [Validators.required]],
      'addOtherPoints': [this._SettingModel.addOtherPoints, [Validators.required]],
      'websiteTitle': [this._SettingModel.websiteTitle, [Validators.required]],
    });
    this.resetModel();
    this.getAllSettings();
  }

  getAllSettings() {
    this._Settings.GetAllSetting().subscribe(data => {
      if (data !== null) {
        if (data.noOfUserInProvince !== null) {
          this.provinceCountSettingsList = data.noOfUserInProvince;
        }
        if (data.noOfUserInDistrict !== null) {
          this.districtCountSettingsList = data.noOfUserInDistrict;
        }
        if (data.noOfUserInArea !== null) {
          this.areaCountSettingsList = data.noOfUserInArea;
        }
        if (data.addPersonPointsAdmin !== null) {
          this._SettingModel.addPersonPointsAdmin = data.addPersonPointsAdmin;
        }
        if (data.addPointPointsAdmin !== null) {
          this._SettingModel.addPointPointsAdmin = data.addPointPointsAdmin;
        }
        if (data.addActivityPointsAdmin !== null) {
          this._SettingModel.addActivityPointsAdmin = data.addActivityPointsAdmin;
        }
        if (data.addhashtagPoints !== null) {
          this._SettingModel.addhashtagPoints = data.addhashtagPoints;
        }
        if (data.addfacebookPoints !== null) {
          this._SettingModel.addfacebookPoints = data.addfacebookPoints;
        }
        if (data.addtelegramPoints !== null) {
          this._SettingModel.addtelegramPoints = data.addtelegramPoints;
        }
        if (data.addOtherPoints !== null) {
          this._SettingModel.addOtherPoints = data.addOtherPoints;
        }
        if (data.noOfUsers !== null) {
          this._SettingModel.noOfUsers = data.noOfUsers;
        }
        if (data.websiteTitle !== null) {
          this._SettingModel.websiteTitle = data.websiteTitle;
        }
        if (data.noOfUserInSocial !== null) {
          data.noOfUserInSocial.forEach(element => {
            for (const ele in element) {
              if (element.hasOwnProperty(ele)) {
                if (ele === 'facebookUserCount') {
                  this._SettingModel.userCountofSocial.facebookUserCount = element['facebookUserCount'];
                }
                if (ele === 'whatsAppUserCount') {
                  this._SettingModel.userCountofSocial.whatsAppUserCount = element['whatsAppUserCount'];
                }
                if (ele === 'twitterUserCount') {
                  this._SettingModel.userCountofSocial.twitterUserCount = element['twitterUserCount'];
                }
                if (ele === 'telegramUserCount') {
                  this._SettingModel.userCountofSocial.telegramUserCount = element['telegramUserCount'];
                }
              }
            }
          });
        }
      }
    });
  }

  getAllProvince() {
    this._Settings.GetAllProvince().subscribe(data => {
      if (data) {
        this.provinceList = data;
      }
    });
  }
  getAllDistrict() {
    this._Settings.GetAllDistrict().subscribe(data => {
      if (data) {
        this.districtList = data;
      }
    });
  }
  getAllArea() {
    this._Settings.GetAllArea().subscribe(data => {
      if (data) {
        this.areaList = data;
      }
    });
  }
  onChange(province) {
    if (province !== '') {
      this.districtListforDD = this.districtList.filter(element => element.province === province);
      this.areaListforDD = this.areaList.filter(element => element.province === province);
    } else {
      this.districtListforDD = [];
      this.areaListforDD = [];
    }
  }

  addProvinceCountSettings() {
    let tempObj = Object.assign({}, this._ProvinceCountModel);
    let isExist = false;
    this.provinceCountSettingsList.forEach(provincesetng => {
      if (provincesetng.province === tempObj.province) {
            isExist = true;
            provincesetng.count = tempObj.count;
      }
    });
    
    if (!isExist) {
      this.provinceCountSettingsList.push(tempObj);
    }
    this._ProvinceCountModel.province = '';
    this._ProvinceCountModel.count = 0;
  }

  addDistrictCountSettings() {
    let tempObj2 = Object.assign({}, this._DistrictCountModel);
    let isExist = false;
    this.districtCountSettingsList.forEach(districtsetng => {
      if (districtsetng.province === tempObj2.province) {
        if (districtsetng.district === tempObj2.district) {
          isExist = true;
          districtsetng.count = tempObj2.count;
        }
      }
    });
    if (!isExist) {
      this.districtCountSettingsList.push(tempObj2);
    }
    this._DistrictCountModel.province = '';
    this._DistrictCountModel.district = '';
    this._DistrictCountModel.count = 0;
  }

  addAreaCountSettings() {
    let tempObj3 = Object.assign({}, this._AreaCountModel);
    let isExist = false;
    this.areaCountSettingsList.forEach(areasetng => {
      if (areasetng.province === tempObj3.province) {
          if (areasetng.area === tempObj3.area) {
            isExist = true;
            areasetng.count = tempObj3.count;
          }
      }
    });
    if (!isExist) {
      this.areaCountSettingsList.push(tempObj3);
    }
    this._AreaCountModel.province = '';
    this._AreaCountModel.area = '';
    this._AreaCountModel.count = 0;
  }


  removeProvinceCountSettings(provinceset) {
    this.provinceCountSettingsList.forEach(element => {
      if (this.provinceCountSettingsList.indexOf(provinceset) === this.provinceCountSettingsList.indexOf(element)) {
        const idx = this.provinceCountSettingsList.indexOf(provinceset);
        this.provinceCountSettingsList.splice(idx);
      }
    });
  }
  removeDistrictCountSettings(districtset) {
    this.districtCountSettingsList.forEach(element => {
      if (this.districtCountSettingsList.indexOf(districtset) === this.districtCountSettingsList.indexOf(element)) {
        const idx = this.districtCountSettingsList.indexOf(districtset);
        this.districtCountSettingsList.splice(idx);
      }
    });
  }
   removeAreaCountSettings(areaset) {
    this.areaCountSettingsList.forEach(element => {
      if (this.areaCountSettingsList.indexOf(areaset) === this.areaCountSettingsList.indexOf(element)) {
        const idx = this.areaCountSettingsList.indexOf(areaset);
        this.areaCountSettingsList.splice(idx);
      }
    });
  }
  saveSettings(value: any, isValid: boolean) {
    if (!isValid) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
      return false;
    }
    const that = this;
    this._SettingModel.noOfUserInProvince = this.provinceCountSettingsList;
    this._SettingModel.noOfUserInDistrict = this.districtCountSettingsList;
    this._SettingModel.noOfUserInArea = this.areaCountSettingsList;
    Object.keys(this._SettingModel.userCountofSocial).forEach(function (key, index) {
      that._SettingModel.noOfUserInSocial.push({ [key]: that._SettingModel.userCountofSocial[key] });
    });
    this._Settings.AddUpdate(this._SettingModel).subscribe(data => {
      if (data) {
        this.msgs.push({ severity: 'info', summary: 'Insert Message', detail: 'Settings Saved Successfully!!!' });
      } else {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Error on Insert' });
      }
    });
  }
  resetModel() {
    this._AreaCountModel.province = '';
    this._AreaCountModel.area = '';
    this._AreaCountModel.count = 0;

    this._DistrictCountModel.province = '';
    this._DistrictCountModel.district = '';
    this._DistrictCountModel.count = 0;

    this._ProvinceCountModel.province = '';
    this._ProvinceCountModel.count = 0;
  }
  // groupBy(array, f) {
  //   const groups = {};
  //   array.forEach(function (o) {
  //     const group = JSON.stringify(f(o));
  //     groups[group] = groups[group] || [];
  //     groups[group].push(o);
  //   });
  //   return Object.keys(groups).map(function (group) {
  //     return groups[group];
  //   });
  // }
}
