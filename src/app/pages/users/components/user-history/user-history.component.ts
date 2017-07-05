import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuditService } from '../../../../core/services/audit/audit.service';
import { AuditModel } from '../../../../core/models/audit/audit.model';

import { AuthService } from '../../../../core/services/common/auth.service';

@Component({
  selector: 'nga-user-history',
  templateUrl: './user-history.html',
  })

export class UserHistoryComponent {
  
  authId: string;
  _auditModel = new AuditModel();

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
            this._auditModel  = data;
        });
  }
}
