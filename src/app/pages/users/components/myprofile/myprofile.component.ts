import { Component } from '@angular/core';

@Component({
  selector: 'nga-myprofile',
  templateUrl: './myprofile.html',
})

export class MyprofileComponent {

  fullnameVisiblity = false;
  fullnameValue: string;

  emailVisiblity = false;
  emailValue: string;

  cityVisiblity = false;
  cityValue: string;

  stateVisiblity = false;
  stateValue: string;

  genderVisiblity = false;
  genderValue: string;

  dateVisiblity = false;
  dateValue: string;

  dayLists: any[] = [];
  monthLists: any[] = [];
  yearLists: any[] = [];

  constructor() {
    this.fullnameValue = 'Samarth Magdallawala';
    this.emailValue = 'samarth.magdallawala@krtya.com';
    this.cityValue = 'surat';
    this.stateValue = 'Gujarat';
    this.genderValue = 'Male';
    this.dateValue = '01/01/2017';
    for ( let i = 1; i <= 31; i++) {
      this.dayLists.push(i);
    }
    for ( let j = 2020; j >= 1970; j--) {
      this.yearLists.push(j);
    }
    this.monthLists = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  }

  edit(fieldname: any) {
    if (fieldname === 'fullname') {
      this.fullnameVisiblity = true;
      this.emailVisiblity = false;
      this.cityVisiblity = false;
      this.stateVisiblity = false;
      this.genderVisiblity = false;
      this.dateVisiblity = false;
    } else if (fieldname === 'email') {
      this.emailVisiblity = true;
      this.fullnameVisiblity = false;
      this.cityVisiblity = false;
      this.stateVisiblity = false;
      this.genderVisiblity = false;
      this.dateVisiblity = false;
    } else if (fieldname === 'city') {
      this.cityVisiblity = true;
      this.fullnameVisiblity = false;
      this.emailVisiblity = false;
      this.stateVisiblity = false;
      this.genderVisiblity = false;
      this.dateVisiblity = false;
    } else if (fieldname === 'state') {
      this.stateVisiblity = true;
      this.fullnameVisiblity = false;
      this.emailVisiblity = false;
      this.cityVisiblity = false;
      this.genderVisiblity = false;
      this.dateVisiblity = false;
    } else if (fieldname === 'gender') {
      this.genderVisiblity = true;
      this.fullnameVisiblity = false;
      this.emailVisiblity = false;
      this.cityVisiblity = false;
      this.stateVisiblity = false;
      this.dateVisiblity = false;
    } else if (fieldname === 'date') {
      this.dateVisiblity = true;
      this.fullnameVisiblity = false;
      this.emailVisiblity = false;
      this.cityVisiblity = false;
      this.stateVisiblity = false;
      this.genderVisiblity = false;
    }
  }
  editSave(fieldname: any) {
    if (fieldname === 'fullname') {
      const fullNameNewValue = <HTMLInputElement> document.getElementById('fullnameField');
      if (fullNameNewValue !== null) {
        this.fullnameValue = fullNameNewValue.value;
      }
      this.fullnameVisiblity = false;
    } else if (fieldname === 'email') {
      const emailNewValue = <HTMLInputElement> document.getElementById('emailField');
      if (emailNewValue !== null) {
        this.emailValue = emailNewValue.value;
      }
      this.emailVisiblity = false;
    } else if (fieldname === 'city') {
      const cityNewValue = <HTMLInputElement> document.getElementById('cityField');
      if (cityNewValue !== null) {
        this.cityValue = cityNewValue.value;
      }
      this.cityVisiblity = false;
    } else if (fieldname === 'state') {
      const stateNewValue = <HTMLInputElement> document.getElementById('stateField');
      if (stateNewValue !== null) {
        this.stateValue = stateNewValue.value;
      }
      this.stateVisiblity = false;
    } else if (fieldname === 'gender') {
      const genderNewValue = <HTMLInputElement> document.getElementById('genderField');
      if (genderNewValue !== null) {
        this.genderValue = genderNewValue.value;
      }
      this.genderVisiblity = false;
    } else if (fieldname === 'date') {
      const dayNewValue = <HTMLInputElement> document.getElementById('dayField');
      const monthNewValue = <HTMLInputElement> document.getElementById('monthField');
      const yearNewValue = <HTMLInputElement> document.getElementById('yearField');
      if ((dayNewValue !== null) && (monthNewValue !== null) && (yearNewValue !== null)) {
        this.dateValue = dayNewValue.value + '/' + monthNewValue.value + '/' + yearNewValue.value;
      }
      this.dateVisiblity = false;
    }
  }

  editCancel(fieldname: any) {
    if (fieldname === 'fullname') {
      this.fullnameVisiblity = false;
    } else if (fieldname === 'email') {
      this.emailVisiblity = false;
    } else if (fieldname === 'city') {
      this.cityVisiblity = false;
    } else if (fieldname === 'state') {
      this.stateVisiblity = false;
    } else if (fieldname === 'gender') {
      this.genderVisiblity = false;
    } else if (fieldname === 'date') {
      this.dateVisiblity = false;
    }
  }
}
