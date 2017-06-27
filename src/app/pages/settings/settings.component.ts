
import { forEach } from '@angular/router/src/utils/collection';

import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SettingsService } from './../../core/services/settings/settings.service';
import { AreaCountModel, DistrictCountModel, SettingModel, SocialCountModel } from './../../core/models/settings/settings.model';


// import { UserLoginModel } from './../../shared/models/userlogin/userlogin.model';

@Component({
  selector: 'settings',
  templateUrl: './settings.html',
})
export class Settings {

  formAreaCount: FormGroup;
  formDistrictCount: FormGroup;
  formSetting: FormGroup;
  // public email: AbstractControl;
  // public password: AbstractControl;
  // public submitted: boolean = false;

  //prov: any = [];

  // provinceDistrictList: any[] = [
  //   {
  //     province: 'Baghdad',
  //     area: 'Baghdad',
  //     District: 'Baghdad',
  //   },
  //   {
  //     province: 'Baghdad',
  //     area: 'Nissan',
  //     District: 'Baghdad',
  //   },
  //   {
  //     province: 'Baghdad',
  //     area: 'Ishbiliya',
  //     District: 'Sadr',
  //   },
  //   {
  //     province: 'pro2',
  //     area: 'area2',
  //     District: 'dist2',
  //   },
  //   {
  //     province: 'pro2',
  //     area: 'area3',
  //     District: 'dist3',
  //   },
  //   {
  //     province: 'pro2',
  //     area: 'area4',
  //     District: 'dist4',
  //   },
  //   {
  //     province: 'pro3',
  //     area: 'area30',
  //     District: 'dist30',
  //   },

  // ];

  provinceList: any[];
  districtList: any[] = [];
  // districtListforProvince: any[];
  areaList: any[] = [];
  // areaListforDistrict: any[];
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
    //  this._SettingModel.noOfUserInSocial.facebookUserCount = 0;
    //  this._SettingModel.noOfUserInSocial.twitterUserCount = 0;
    //  this._SettingModel.noOfUserInSocial.whatsAppUserCount = 0;
    //  this._SettingModel.noOfUserInSocial.telegramUserCount = 0;

    // this.provinceList = this.groupBy(this.provinceDistrictList, function (item) {
    //   return [item.province];
    // });

    // this.provinceList.forEach(element => {
    //   const index = element[0]['province'];
    //   this.prov.push(index);
    //   if (!this.areaList[index]) {
    //     this.areaList[index] = [];
    //   }
    //   if (!this.districtList[index]) {
    //     this.districtList[index] = [];
    //   }
    //   element.forEach(ele => {
    //     this.areaList[index].push(ele.area);
    //     this.districtList[index].push(ele.District);
    //   });
    // });

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
  }


  getAllProvince() {
    this._Settings.GetAllProvince().subscribe(data => {
      if (data) {
        //console.log(data);
        this.provinceList = data;
        //console.log(this.provinceList);
      }
    });
  }
  getAllDistrict() {
    this._Settings.GetAllDistrict().subscribe(data => {
      if (data) {
        //console.log(data);
        this.districtList = data;
      }
    });
  }
  getAllArea() {
    this._Settings.GetAllArea().subscribe(data => {
      if (data) {
        //console.log(data);
        this.areaList = data;
      }
    });
  }

  onChange(province) {
    //console.log(province);
    //console.log(this.districtList);
    //console.log(this.areaList);
    if (province !== '') {
      // this.districtListforDD = this.districtList.map(

      //   ele => ele[province] );
      // this.areaListforDD = this.areaList.map(

      //   ele => ele[province]);

      // this.districtListforDD = this.districtList[province];
      // this.areaListforDD = this.areaList[province];
      this.districtListforDD = this.districtList.filter(element => element.province === province);
      this.areaListforDD = this.areaList.filter(element => element.province === province);
    } else {
      this.districtListforDD = [];
      this.areaListforDD = [];
    }
    console.log(this.districtListforDD);
    console.log(this.areaListforDD);
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

    //this.districtCountSettingsList.push(tempObj2);
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

saveSettings(): void {

  this._SettingModel.noOfUserInCity = this.areaCountSettingsList;
  this._SettingModel.noOfUserInDistrict = this.districtCountSettingsList;
   this._SettingModel.noOfUserInSocial.push( this._SettingModel.userCountofSocial);
  this._Settings.AddUpdate(this._SettingModel).subscribe( data => {
       if (data) {
           console.log('saved');
       }
  });
}

  // public onSubmit(values: Object): void {
  //   this.submitted = true;
  //   if (this.form.valid) {
  //     // your code goes here
  //     // console.log(values);
  //     console.log(this._UserLoginModel);
  //     this.userloginService.login(this._UserLoginModel).subscribe(data => {
  //       console.log(data);
  //       if (data) {
  //
  //           }
  //         this.form.reset();
  //     }
  //     ,response => {
  //               if (response.status == 400) {
  //                   return false;
  //               }
  //           }
  //     );
  //   }
  // }

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
