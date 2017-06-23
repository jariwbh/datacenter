
import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserloginService } from './../../core/services/userlogin/userlogin.service';

import { UserLoginModel } from './../../shared/models/userlogin/userlogin.model';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  public _UserLoginModel = new UserLoginModel();

  constructor(fb: FormBuilder, private userloginService: UserloginService, private _router: Router) {
    // this.form = fb.group({
    //   'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    //   'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    // });

    this.form = fb.group({
      'email': [this._UserLoginModel.email, Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': [this._UserLoginModel.password, Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
        this.userloginService.login(this._UserLoginModel).subscribe(data => {
          console.log(data);
          if(data)
          {
             this.form.reset();
             this._router.navigate(['dashboard'])
          }
        });
    }
  }
}
