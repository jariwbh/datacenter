import { Component } from '@angular/core';

@Component({
  selector: 'nga-add-activity',
  templateUrl: './add-activity.html',
  styleUrls: ['./grid.scss'],
})

export class AddActivityComponent {

activityTypeVisibilty = true;
howActivityVisibilty = false;
aboutVisibilty = false;

constructor() {
}

switchbox(value: any) {
    if (value === 'activityType') {
      this.activityTypeVisibilty = true;
      this.howActivityVisibilty = false;
      this.aboutVisibilty = false;
    } else if (value === 'howActivity') {
      this.activityTypeVisibilty = false;
      this.howActivityVisibilty = true;
      this.aboutVisibilty = false;
    } else if (value === 'about') {
      this.activityTypeVisibilty = false;
      this.howActivityVisibilty = false;
      this.aboutVisibilty = true;
    }
  }

}
