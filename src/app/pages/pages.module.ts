import { NgModule } from '@angular/core';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
// import { LoginComponent } from 'app/pages/login.component';
import { RegisterComponent } from 'app/pages/register.component';

import { PagesRoutingModule } from 'app/pages/pages-routing.module';
import { LoginComponent } from 'app/pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ PagesRoutingModule,FormsModule,CommonModule ],
  declarations: [
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent
  ]
})
export class PagesModule { }
