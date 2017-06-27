
export class SettingModel {
  noOfUserInCity: AreaCountModel[];
  noOfUserInDistrict: DistrictCountModel[];
  noOfUserInSocial: any[];
  noOfUsers: number;
  websiteTitle: string;
  userCountofSocial: SocialCountModel;
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

export class SocialCountModel {
  facebookUserCount: number;
  whatsAppUserCount: number;
  twitterUserCount: number;
  telegramUserCount: number;
}
