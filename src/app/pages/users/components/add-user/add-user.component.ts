import { Component } from '@angular/core';

@Component({
  selector: 'nga-add-user',
  templateUrl: './add-user.html',
  styleUrls: ['./grid.scss'],
})

export class AddUserComponent {
  
  informationVisibilty = true;
  usernamepasswordVisibilty = false;
  accesscontrolVisibilty = false;

  _completedStep = 1;

  switchbox(value: any) {
    if (value === 'information') {
      if (this._completedStep < 1) {
        this._completedStep = 1;
      }
      this.informationVisibilty = true;
      this.usernamepasswordVisibilty = false;
      this.accesscontrolVisibilty = false;
    } else if (value === 'usernamepassword') {
      if (this._completedStep < 2) {
        this._completedStep = 2;
      }
      this.informationVisibilty = false;
      this.usernamepasswordVisibilty = true;
      this.accesscontrolVisibilty = false;
    } else if (value === 'controlaccess') {
      if (this._completedStep < 3) {
        this._completedStep = 3;
      }
      this.informationVisibilty = false;
      this.usernamepasswordVisibilty = false;
      this.accesscontrolVisibilty = true;
    }
  }
}
