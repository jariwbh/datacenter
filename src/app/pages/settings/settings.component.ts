
import { forEach } from '@angular/router/src/utils/collection';

import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


// import { AuthService } from './../../core/services/common/auth.service';
// import { UserloginService } from './../../core/services/userlogin/userlogin.service';

// import { UserLoginModel } from './../../shared/models/userlogin/userlogin.model';

@Component({
  selector: 'settings',
  templateUrl: './settings.html',
})
export class Settings {

  formAreaCount: FormGroup;
  formDistrictCount: FormGroup;
  // public email: AbstractControl;
  // public password: AbstractControl;
  // public submitted: boolean = false;
  // public _UserLoginModel = new UserLoginModel();

  prov: any = [];

  provinceDistrictList: any[] = [
    {
      province: 'Baghdad',
      area: 'Baghdad',
      District: 'Baghdad',
    },
    {
      province: 'Baghdad',
      area: 'Nissan',
      District: 'Baghdad',
    },
    {
      province: 'Baghdad',
      area: 'Ishbiliya',
      District: 'Sadr',
    },
    {
      province: 'pro2',
      area: 'area2',
      District: 'dist2',
    },
    {
      province: 'pro2',
      area: 'area3',
      District: 'dist3',
    },
    {
      province: 'pro2',
      area: 'area4',
      District: 'dist4',
    },
    {
      province: 'pro3',
      area: 'area30',
      District: 'dist30',
    },

  ];

  provinceList: any[];
  districtList: any[] = [];
  // districtListforProvince: any[];
  areaList: any[] = [];
  // areaListforDistrict: any[];
  districtListforDD: any[] = [];
  areaListforDD: any[] = [];
  AreaCountSettingsList: any[] = [];
  DistrictCountSettingsList: any[] = [];
  disableAreaCountAdd: boolean = false;

  _SettingModel: SettingModel = new SettingModel();
  _AreaCountModel: AreaCountModel = new AreaCountModel();
  _DistrictCountModel: DistrictCountModel = new DistrictCountModel();


  constructor(fb: FormBuilder,
    private _router: Router) {

    // this._SettingModel.areaCountSetting.province = '';
    // this._SettingModel.areaCountSetting.district = '';
    // this._SettingModel.areaCountSetting.area = '';
    // this._SettingModel.areaCountSetting.count = 0;

    this.provinceList = this.groupBy(this.provinceDistrictList, function (item) {
      return [item.province];
    });

    this.provinceList.forEach(element => {
      const index = element[0]['province'];
      this.prov.push(index);
      if (!this.areaList[index]) {
        this.areaList[index] = [];
      }
      if (!this.districtList[index]) {
        this.districtList[index] = [];
      }
      element.forEach(ele => {
        this.areaList[index].push(ele.area);
        this.districtList[index].push(ele.District);
      });
    });

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
    this.resetModel();
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

      this.districtListforDD = this.districtList[province];
      this.areaListforDD = this.areaList[province];
    } else {
      this.districtListforDD = [];
      this.areaListforDD = [];
    }
    console.log(this.districtListforDD);
    console.log(this.areaListforDD);
  }

  addAreaCountSettings() {
    let tempObj = Object.assign({}, this._AreaCountModel);
    this.AreaCountSettingsList.push(tempObj);
    this._AreaCountModel.province = '';
    this._AreaCountModel.district = '';
    this._AreaCountModel.area = '';
    this._AreaCountModel.count = 0;
  }

  addDistrictCountSettings() {
    let tempObj2 = Object.assign({}, this._DistrictCountModel);
    this.DistrictCountSettingsList.push(tempObj2);
    this._DistrictCountModel.province = '';
    this._DistrictCountModel.district = '';
    this._DistrictCountModel.count = 0;
  }

  removeAreaCountSettings(areaset) {
    this.AreaCountSettingsList.forEach(element => {
      if (this.AreaCountSettingsList.indexOf(areaset) === this.AreaCountSettingsList.indexOf(element)) {
        const idx = this.AreaCountSettingsList.indexOf(areaset);
        this.AreaCountSettingsList.splice(idx);
      }
    });
  }

  removeDistrictCountSettings(districtset) {
     this.DistrictCountSettingsList.forEach(element => {
      if (this.DistrictCountSettingsList.indexOf(districtset) === this.DistrictCountSettingsList.indexOf(element)) {
        const idx = this.DistrictCountSettingsList.indexOf(districtset);
        this.DistrictCountSettingsList.splice(idx);
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

  groupBy(array, f) {
    const groups = {};
    array.forEach(function (o) {
      const group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });

    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  }

}

export class SettingModel {
  areaCountSettingList: AreaCountModel[];
  districtCountSettingList: DistrictCountModel[];
  facebookUserCount: number;
  whatsAppUserCount: number;
  twitterUserCount: number;
  instagramUserCount: number;
  totalUserCount: number;
  nameofWebSite: string;
}

export class AreaCountModel {
  province: string;
  district: string;
  area: string;
  count: number;
}

export class DistrictCountModel {
  province: string;
  district: string;
  count: number;
}
