import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuditService } from '../../../../core/services/audit/audit.service';
import { AuditModel } from '../../../../core/models/audit/audit.model';

import { AuthService } from '../../../../core/services/common/auth.service';

@Component({
  selector: 'nga-user-history',
  templateUrl: './user-history.html',
   styleUrls: ['./user-history.css'],
  })

export class UserHistoryComponent {
  
  authId: string;
  _auditModel = new AuditModel();
  _auditLists: any [] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _auditService: AuditService,
    
  ) {
      if (this._authService.auth_id === '') {
        this.authId = null;
      } else {
        this.authId = this._authService.auth_id;
      }
  }

  ngOnInit() {
    this.getAllAudit(this.authId);
  }
  getAllAudit(id) {
    this._auditService
          .GetAll(id)
          .subscribe(
          data => {
            data.forEach(element => {
              element.date = this.updateClock(element.date);
            });
            this._auditLists  = data;
        });
  }

  updateClock(startStamp) {
    let newDate = new Date();
    let newStamp = newDate.getTime();
    let diff = Math.round((newStamp-startStamp)/1000);
    
    let d = Math.floor(diff/(24*60*60)); /* though I hope she won't be working for consecutive days :) */
    diff = diff-(d*24*60*60);
    let h = Math.floor(diff/(60*60));
    diff = diff-(h*60*60);
    let m = Math.floor(diff/(60));
    diff = diff-(m*60);
    let s = diff;
    return  d + " day(s), " + h + " hour(s), " + m + " minute(s), " + s + " second(s) ago";
  }
}
