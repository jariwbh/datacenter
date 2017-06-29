
import { forEach } from '@angular/router/src/utils/collection';

import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SettingsService } from './../../core/services/settings/settings.service';
import {
  AreaCountModel, DistrictCountModel,
  SettingModel, SocialCountModel,
} from './../../core/models/settings/settings.model';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'settings',
  templateUrl: './settings.html',
})
export class Settings {

  formAreaCount: FormGroup;
  formDistrictCount: FormGroup;
  formSetting: FormGroup;
  msgs: Message[] = [];

  provinceList: any[];
  districtList: any[] = [];

  areaList: any[] = [];

  districtListforDD: any[] = [];
  areaListforDD: any[] = [];
  areaCountSettingsList: any[] = [];
  districtCountSettingsList: any[] = [];

  _SettingModel: SettingModel = new SettingModel();
  _AreaCountModel: AreaCountModel = new AreaCountModel();
  _DistrictCountModel: DistrictCountModel = new DistrictCountModel();


  constructor(fb: FormBuilder,
    private _router: Router,
    private _Settings: SettingsService) {
    this._SettingModel.userCountofSocial = new SocialCountModel();
    this._SettingModel.noOfUserInSocial = [];
    this.getAllProvince();
    this.getAllDistrict();
    this.getAllArea();
    this.formAreaCount = fb.group({
      'province': [this._AreaCountModel.province, [Validators.required]],
      'district': [this._AreaCountModel.district, [Validators.required]],
      'area': [this._AreaCountModel.area, [Validators.required]],
      'count': [this._AreaCountModel.count, [Validators.required]],
    });
    this.formDistrictCount = fb.group({
      'province': [this._DistrictCountModel.province, [Validators.required]],
      'district': [this._DistrictCountModel.district, [Validators.required]],
      'count': [this._DistrictCountModel.count, [Validators.required]],
    });
    this.formSetting = fb.group({
      'facebookUserCount': [this._SettingModel.userCountofSocial.facebookUserCount, [Validators.required]],
      'twitterUserCount': [this._SettingModel.userCountofSocial.twitterUserCount, [Validators.required]],
      'whatsAppUserCount': [this._SettingModel.userCountofSocial.whatsAppUserCount, [Validators.required]],
      'telegramUserCount': [this._SettingModel.userCountofSocial.telegramUserCount, [Validators.required]],
      'noOfUsers': [this._SettingModel.noOfUsers, [Validators.required]],
      'websiteTitle': [this._SettingModel.websiteTitle, [Validators.required]],
    });
    this.resetModel();
    this.getAllSettings();
  }

  getAllSettings() {
    this._Settings.GetAllSetting().subscribe(data => {
      if (data !== null) {
        if (data.noOfUserInCity !== null) {
          this.areaCountSettingsList = data.noOfUserInCity;
        }
        if (data.noOfUserInDistrict !== null) {
          this.districtCountSettingsList = data.noOfUserInDistrict;
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
  addAreaCountSettings() {
    let tempObj = Object.assign({}, this._AreaCountModel);
    let isExist = false;
    this.areaCountSettingsList.forEach(areasetng => {
      if (areasetng.province === tempObj.province) {
        if (areasetng.district === tempObj.district) {
          if (areasetng.area === tempObj.area) {
            isExist = true;
            areasetng.count = tempObj.count;
          } else {
            isExist = false;
          }
        }
      }
    });
    if (!isExist) {
      this.areaCountSettingsList.push(tempObj);
    }
    this._AreaCountModel.province = '';
    this._AreaCountModel.district = '';
    this._AreaCountModel.area = '';
    this._AreaCountModel.count = 0;
  }

  addDistrictCountSettings() {
    let tempObj2 = Object.assign({}, this._DistrictCountModel);
    let isExist = false;
    this.districtCountSettingsList.forEach(districtsetng => {
      if (districtsetng.province === tempObj2.province) {
        if (districtsetng.district === tempObj2.district) {
          isExist = true;
          districtsetng.count = tempObj2.count;
        } else {
          isExist = false;
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

  removeAreaCountSettings(areaset) {
    this.areaCountSettingsList.forEach(element => {
      if (this.areaCountSettingsList.indexOf(areaset) === this.areaCountSettingsList.indexOf(element)) {
        const idx = this.areaCountSettingsList.indexOf(areaset);
        this.areaCountSettingsList.splice(idx);
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
  saveSettings(value: any, isValid: boolean) {
    if (!isValid) {
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
      return false;
    }
    const that = this;
    this._SettingModel.noOfUserInCity = this.areaCountSettingsList;
    this._SettingModel.noOfUserInDistrict = this.districtCountSettingsList;
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
    this._AreaCountModel.district = '';
    this._AreaCountModel.area = '';
    this._AreaCountModel.count = 0;

    this._DistrictCountModel.province = '';
    this._DistrictCountModel.district = '';
    this._DistrictCountModel.count = 0;
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