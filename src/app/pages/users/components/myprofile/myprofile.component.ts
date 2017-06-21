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

  constructor() {
    this.fullnameValue = 'Samarth Magdallawala';
    this.emailValue = 'samarth.magdallawala@krtya.com';
    this.cityValue = 'surat';
    this.stateValue = 'Gujarat';
    this.genderValue = 'Male';
    this.dateValue = '01/01/2017';
  }

  edit(fieldname: any) {
    if (fieldname === 'fullname') {
      this.fullnameVisiblity = true;
    } else if (fieldname === 'email') {
      this.emailVisiblity = true;
    } else if (fieldname === 'city') {
      this.cityVisiblity = true;
    } else if (fieldname === 'state') {
      this.stateVisiblity = true;
    } else if (fieldname === 'gender') {
      this.genderVisiblity = true;
    } else if (fieldname === 'date') {
      this.dateVisiblity = true;
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
      const dateNewValue = <HTMLInputElement> document.getElementById('dateField');
      if (dateNewValue !== null) {
        this.dateValue = dateNewValue.value;
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
