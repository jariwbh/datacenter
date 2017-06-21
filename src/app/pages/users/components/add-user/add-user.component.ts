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
  
  switchbox(value: any) {
    if (value === 'information') {
      this.informationVisibilty = true;
      this.usernamepasswordVisibilty = false;
      this.accesscontrolVisibilty = false;
    } else if (value === 'usernamepassword') {
      this.informationVisibilty = false;
      this.usernamepasswordVisibilty = true;
      this.accesscontrolVisibilty = false;
    } else if (value === 'controlaccess') {
      this.informationVisibilty = false;
      this.usernamepasswordVisibilty = false;
      this.accesscontrolVisibilty = true;
    }
  }
}
