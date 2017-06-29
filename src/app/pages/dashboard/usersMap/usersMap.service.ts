import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, layoutPaths } from '../../../theme';

@Injectable()
export class UsersMapService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {
    let layoutColors = this._baConfig.get().colors;

    return {
      type: 'map',
      theme: 'blur',
      zoomControl: { zoomControlEnabled: false, panControlEnabled: false },

      dataProvider: {
        // map: 'worldLow',
        map: 'iraqLow',
        
        // zoomLevel: 3.5,
        // zoomLongitude: 10,
        // zoomLatitude: 52,

        // zoomLevel: 7.0,
        // zoomLongitude: 25,
        // zoomLatitude: 30,

        //  zoomLongitude: 24.0174,
        // zoomLatitude: -1.1076,
        areas: [
          // { title: 'Austria', id: 'AT', color: layoutColors.primary, customData: '1 244', groupId: '1'},
          // { title: 'Ireland', id: 'IE', color: layoutColors.primary, customData: '1 342', groupId: '1'},
          // { title: 'Denmark', id: 'DK', color: layoutColors.primary, customData: '1 973', groupId: '1'},
          // { title: 'Finland', id: 'FI', color: layoutColors.primary, customData: '1 573', groupId: '1'},
          // { title: 'Sweden', id: 'SE', color: layoutColors.primary, customData: '1 084', groupId: '1'},
          // { title: 'Great Britain', id: 'GB', color: layoutColors.primary, customData: '1 452', groupId: '1'},
          // { title: 'Italy', id: 'IT', color: layoutColors.primary, customData: '1 321', groupId: '1'},
          // { title: 'France', id: 'FR', color: layoutColors.primary, customData: '1 112', groupId: '1'},
          // { title: 'Spain', id: 'ES', color: layoutColors.primary, customData: '1 865', groupId: '1'},
          // { title: 'Greece', id: 'GR', color: layoutColors.primary, customData: '1 453', groupId: '1'},
          // { title: 'Germany', id: 'DE', color: layoutColors.primary, customData: '1 957', groupId: '1'},
          // { title: 'Belgium', id: 'BE', color: layoutColors.primary, customData: '1 011', groupId: '1'},
          // { title: 'Luxembourg', id: 'LU', color: layoutColors.primary, customData: '1 011', groupId: '1'},
          // { title: 'Netherlands', id: 'NL', color: layoutColors.primary, customData: '1 213', groupId: '1'},
          // { title: 'Portugal', id: 'PT', color: layoutColors.primary, customData: '1 291', groupId: '1'},
          // { title: 'Lithuania', id: 'LT', color: layoutColors.successLight, customData: '567', groupId: '2'},
          // { title: 'Latvia', id: 'LV', color: layoutColors.successLight, customData: '589', groupId: '2'},
          // { title: 'Czech Republic ', id: 'CZ', color: layoutColors.successLight, customData: '785', groupId: '2'},
          // { title: 'Slovakia', id: 'SK', color: layoutColors.successLight, customData: '965', groupId: '2'},
          // { title: 'Estonia', id: 'EE', color: layoutColors.successLight, customData: '685', groupId: '2'},
          // { title: 'Hungary', id: 'HU', color: layoutColors.successLight, customData: '854', groupId: '2'},
          // { title: 'Cyprus', id: 'CY', color: layoutColors.successLight, customData: '754', groupId: '2'},
          // { title: 'Malta', id: 'MT', color: layoutColors.successLight, customData: '867', groupId: '2'},
          // { title: 'Poland', id: 'PL', color: layoutColors.successLight, customData: '759', groupId: '2'},
          // { title: 'Romania', id: 'RO', color: layoutColors.success, customData: '302', groupId: '3'},
          // { title: 'Bulgaria', id: 'BG', color: layoutColors.success, customData: '102', groupId: '3'},
          // { title: 'Slovenia', id: 'SI', color: layoutColors.danger, customData: '23', groupId: '4'},
          // { title: 'Croatia', id: 'HR', color: layoutColors.danger, customData: '96', groupId: '4'}
          //  { title: 'Basrah', id: 'ES', color: layoutColors.primary, customData: '80', groupId: '1' },
          //  { title: 'Karbala', id: 'GB', color: layoutColors.successLight, customData: '100', groupId: '2' },
          // { title: 'Mesan', id: 'SE', color: layoutColors.danger, customData: '20', groupId: '4' },
          // { title: 'Iraq', id: 'IQ', color: layoutColors.success, customData: '100', groupId: '3' },

          { title: 'Al-Basrah', id: 'IQ-BA', color: '#66ffb3', customData: '965', groupId: '1' },
          { title: 'Al-Qadisiyah', id: 'IQ-QA', color: '#66ff8c', customData: '685', groupId: '2' },
          { title: 'Al-Muthannia', id: 'IQ-MU', color: '#66ffff', customData: '854', groupId: '3' },
          { title: 'An-Najaf', id: 'IQ-NA', color: '#66b3ff', customData: '754', groupId: '4' },
          { title: 'Babylon', id: 'IQ-BB', color: '#0066cc', customData: '867', groupId: '5' },
          { title: 'Baghdad', id: 'IQ-BG', color: '#0bb238', customData: '759', groupId: '6' },
          { title: 'Diyala', id: 'IQ-DI', color: '#ffb84d', customData: '302', groupId: '7' },
          { title: 'Dhi-Qar', id: 'IQ-DQ', color: '#ffdaa1', customData: '102', groupId: '8' },
          { title: 'Sala ad-Din', id: 'IQ-SD', color: '#ffd736', customData: '23', groupId: '9' },
          { title: 'Karbala', id: 'IQ-KA', color: '#5eccc0', customData: '96', groupId: '10' },
          { title: 'Kirkuk', id: 'IQ-KI', color: '#ffff77', customData: '80', groupId: '11' },
          { title: 'Maysan', id: 'IQ-MA', color: '#997463', customData: '100', groupId: '12' },
          { title: 'Ninawa', id: 'IQ-NI', color: '#55cc20', customData: '20', groupId: '13' },
          { title: 'Wasit', id: 'IQ-WA', color: '#cc5520', customData: '100', groupId: '14' },
        ],
      },

      areasSettings: {
        rollOverOutlineColor: layoutColors.border,
        // rollOverColor: layoutColors.primaryDark,
        rollOverColor: '#ff4441',
        alpha: 0.8,
        unlistedAreasAlpha: 0.2,
        //unlistedAreasAlpha: 0,
        unlistedAreasColor: layoutColors.defaultText,
        balloonText: '[[title]]: [[customData]] users',
      },


      legend: {
        width: '100%',
        marginRight: 27,
        marginLeft: 27,
        equalWidths: false,
        backgroundAlpha: 0.3,
        backgroundColor: layoutColors.border,
        borderColor: layoutColors.border,
        borderAlpha: 1,
        top: 362,
        left: 0,
        horizontalGap: 10,
        data: [
          {
            title: 'over 1 000 users',
            color: layoutColors.primary,
          },
          {
            title: '500 - 1 000 users',
            color: layoutColors.successLight,
          },
          {
            title: '100 - 500 users',
            color: layoutColors.success,
          },
          {
            title: '0 - 100 users',
            color: layoutColors.danger,
          },
        ],
      },
      export: {
        enabled: true,
      },
      creditsPosition: 'bottom-right',
      pathToImages: layoutPaths.images.amChart,
    };
  }
}
