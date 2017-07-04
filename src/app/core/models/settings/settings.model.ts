
export class SettingModel {
  noOfUserInProvince: ProvinceCountModel[];
  noOfUserInDistrict: DistrictCountModel[];
  noOfUserInArea: AreaCountModel[];
  noOfUserInSocial: any[];
  addPersonPointsAdmin: number;
  addPointPointsAdmin: number;
  addActivityPointsAdmin: number;
  addhashtagPoints: number;
  addfacebookPoints: number;
  addtelegramPoints: number;
  addOtherPoints: number;
  noOfUsers: number;
  websiteTitle: string;
  userCountofSocial: SocialCountModel;
}

export class ProvinceCountModel {
  province: string;
  count: number;
}

export class DistrictCountModel {
  province: string;
  district: string;
  count: number;
}

export class AreaCountModel {
  province: string;
  area: string;
  count: number;
}

export class SocialCountModel {
  facebookUserCount: number;
  whatsAppUserCount: number;
  twitterUserCount: number;
  telegramUserCount: number;
}
