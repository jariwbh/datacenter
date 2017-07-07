
import { Router } from '@angular/router';

import {Component} from '@angular/core';

import {PieChartService} from './pieChart.service';
import { CommonDataService } from './../../../core/services/common/common-data.service';
import { SettingsService } from './../../../core/services/settings/settings.service';
import { DashboardService } from './../../../core/services/dashboard/dashboard.service';

import 'easy-pie-chart/dist/jquery.easypiechart.js';

@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html',
  styleUrls: ['./pieChart.scss']
})
// TODO: move easypiechart to component
export class PieChart {
  
  public charts: Array<Object>;
  private _init = false;
  socialOptions: string[] = ['facebook', 'twitter', 'telegram', 'whatsApp'];
  socialCount: any = {};
  socialSettingCount: any = {};
  constructor(private _pieChartService: PieChartService, private _CommonDataService: CommonDataService, 
   private _router: Router,
   private _Settings: SettingsService,
    private _DashboardService: DashboardService) {
       this.socialCount.facebookCount = 0;
       this.socialCount.facebookSettingCount = 0;
        this.socialCount.facebookCountper = 0;
        this.socialCount.twitterCount = 0;
        this.socialCount.twitterSettingCount = 0;
        this.socialCount.twitterCountper = 0;
        this.socialCount.telegramCount = 0;
        this.socialCount.telegramSettingCount = 0;
        this.socialCount.telegramCountper = 0;
        this.socialCount.whatsAppCount = 0;
        this.socialCount.whatsAppSettingCount = 0;
        this.socialCount.whatsAppCountper = 0;
    this.charts = this._pieChartService.getData();
    this.loadSocialCount();
  }

  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      this._updatePieCharts();
      this._init = true;
    }
  }


  goToPeopleListView (socialData: any ) {
          this._CommonDataService.filterDataBy = 'social';
          this._CommonDataService.filterData = socialData;
          this._router.navigate(['/pages/peoples/manage-people']);
  }

  private _loadPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round(percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }
  loadSocialCount() {
    this._Settings.GetAllSetting().subscribe( data => {
      if ( data ) {
         this.socialSettingCount = data;
         if (data.noOfUserInSocial !== null) {
          data.noOfUserInSocial.forEach(element => {
            for (const ele in element) {
              if (element.hasOwnProperty(ele)) {
                if (ele === 'facebookUserCount') {
                  this.socialSettingCount.facebookUserCount = element['facebookUserCount'];
                }
                if (ele === 'whatsAppUserCount') {
                  this.socialSettingCount.whatsAppUserCount = element['whatsAppUserCount'];
                }
                if (ele === 'twitterUserCount') {
                  this.socialSettingCount.twitterUserCount = element['twitterUserCount'];
                }
                if (ele === 'telegramUserCount') {
                  this.socialSettingCount.telegramUserCount = element['telegramUserCount'];
                }
              }
            }
          });
        }
      }
    });
    this.socialOptions.forEach( ele => {
      if (ele === 'facebook') {
         this._DashboardService.GetCountForSocial(ele).subscribe(data => {
           if (data !== null) {
             this.socialCount.facebookCount = data;
             if ( this.socialSettingCount.facebookUserCount !== undefined) {
                   if ( this.socialSettingCount.facebookUserCount !== null) {
                      let dBy = this.socialSettingCount.facebookUserCount;
                       if (this.socialSettingCount.facebookUserCount === 0) {
                         dBy = 1;
                       }
                        this.socialCount.facebookCountPer = 
                        Math.floor(this.socialCount.facebookCount * 100 / dBy);
                         this.socialCount.facebookSettingCount = this.socialSettingCount.facebookUserCount;
                   }
             }
           }
         });
      }
      if (ele === 'twitter') {
         this._DashboardService.GetCountForSocial(ele).subscribe(data => {
           if (data !== null) {
             this.socialCount.twitterCount = data;
             if ( this.socialSettingCount.twitterUserCount !== undefined) {
                   if ( this.socialSettingCount.twitterUserCount !== null) {
                      let dBy = this.socialSettingCount.twitterUserCount;
                     if (this.socialSettingCount.twitterUserCount === 0) {
                         dBy = 1;
                       }
                        this.socialCount.twitterCountPer = 
                        Math.floor(this.socialCount.twitterCount * 100 / dBy);
                        this.socialCount.twitterSettingCount = this.socialSettingCount.twitterUserCount;
                   }
             }
           }
         });
      }
       if (ele === 'telegram') {
         this._DashboardService.GetCountForSocial(ele).subscribe(data => {
           if (data !== null) {
             this.socialCount.telegramCount = data;
              if ( this.socialSettingCount.telegramUserCount !== undefined) {
                   if ( this.socialSettingCount.telegramUserCount !== null) {
                     let dBy = this.socialSettingCount.telegramUserCount;
                     if (this.socialSettingCount.telegramUserCount === 0) {
                         dBy = 1;
                       }
                        this.socialCount.telegramCountPer = 
                        Math.floor(this.socialCount.telegramCount * 100 / dBy);
                        this.socialCount.telegramSettingCount = this.socialSettingCount.telegramUserCount;
                   }
             }
           }
         });
      }
       if (ele === 'whatsApp') {
         this._DashboardService.GetCountForSocial('others').subscribe(data => {
           if (data !== null) {
             this.socialCount.whatsAppCount = data;
              if ( this.socialSettingCount.whatsAppUserCount !== undefined) {
                   if ( this.socialSettingCount.whatsAppUserCount !== null) {
                     let dBy = this.socialSettingCount.whatsAppUserCount;
                     if (this.socialSettingCount.whatsAppUserCount === 0) {
                         dBy = 1;
                       }
                        this.socialCount.whatsAppCountPer = 
                        Math.floor(this.socialCount.whatsAppCount * 100 / dBy);
                        this.socialCount.whatsAppSettingCount = this.socialSettingCount.whatsAppUserCount;
                   }
             }
           }
         });
      }
      

    });
    
  }
  private _updatePieCharts() {
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

    jQuery('.pie-charts .chart').each(function(index, chart) {
      jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    });
  }
}
