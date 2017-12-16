import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp-password',
  templateUrl: './otp-password.component.html',
  styleUrls: ['./otp-password.component.scss']
})
export class OtpPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getPassword() {
    console.log('password');
    const pass = <HTMLInputElement>document.getElementById('UserName');
    const val = 1;
    console.log(pass.value);
    // console.log(val);
  }

  getOTP() {
    console.log('otp');
    const otp = <HTMLInputElement>document.getElementById('UserName');
    console.log(otp.value);
  }

}
