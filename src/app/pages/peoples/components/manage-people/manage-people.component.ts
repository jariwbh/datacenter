import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManagepeopleService } from '../../../../core/services/people/manage-people.service';

import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
@Component({
  selector: 'nga-manage-people',
  templateUrl: './manage-people.html',
})

export class ManagePeopleComponent {
  cardViewVisibilty = true;
  _peoplelist: any[] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _managepeopleService: ManagepeopleService,
  ) {
    
  }

  ngOnInit() {
    this.getAllPeople();
  }

  getAllPeople() {
    this._managepeopleService
          .GetAll()
          .subscribe(
          data => {
            if (data) {
              data.forEach(element => {
                if (element.person) {
                  this._peoplelist.push(element.person);
                }
              });
            }
            console.log(this._peoplelist);
        });
  }
  switchView() {
    if ( this.cardViewVisibilty ) {
      this.cardViewVisibilty = false;
    } else {
      this.cardViewVisibilty = true;
    }
  }
}
