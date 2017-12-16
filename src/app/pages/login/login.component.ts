import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/admin-view/shared/authentication.service';
import { MySociety } from 'app/admin-view/models/mysociety';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public userCredentails = new MySociety;
  public userData: MySociety[];


  constructor(private _authservice: AuthenticationService) { }

  ngOnInit() {
    this.userCredentails.imei = '0';
    
    // this._authservice.logout();
  }

  onLogin() {
    // console.log('click');
    // console.log(this.userCredentails);
    this._authservice.authenticateUser(this.userCredentails);
  }

}
