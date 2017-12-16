import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
// import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
// import { AsideToggleDirective } from './shared/aside.directive';
// import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
// import { FullLayoutComponent } from './layouts/full-layout.component';
// import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { NAV_DROPDOWN_DIRECTIVES } from 'app/admin-view/commons/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from 'app/admin-view/commons/sidebar.directive';
import { AsideToggleDirective } from 'app/admin-view/commons/aside.directive';
import { BreadcrumbsComponent } from 'app/admin-view/commons/breadcrumb.component';
import { FullLayoutComponent } from 'app/admin-view/layouts/full-layout.component';
import { SimpleLayoutComponent } from 'app/admin-view/layouts/simple-layout.component';
import { CandidateDailyExpenseComponent } from 'app/admin-view/internal-pages/candidate-daily-expense/candidate-daily-expense.component';
import { ExpenseService } from 'app/admin-view/shared/expense.service';
import { HttpModule } from '@angular/http/src/http_module';
import { FormBuilder } from '@angular/forms/src/form_builder';
import { FundCollectionDetailsComponent } from 'app/admin-view/internal-pages/fund-collection-details/fund-collection-details.component';
import { LocalBodyComponent } from 'app/admin-view/internal-pages/local-body/local-body.component';
import { LolocalBodyTableComponent } from 'app/admin-view/internal-pages/lolocal-body-table/lolocal-body-table.component';
import { FormsModule } from '@angular/forms';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { LocalBodyService } from 'app/admin-view/shared/local-body.service';
import { AuthenticationService } from 'app/admin-view/shared/authentication.service';
import { EncryptionService } from 'app/admin-view/shared/encryption.service';
import { AuthGaurdService } from 'app/admin-view/shared/auth-gaurd.service';
import { SessionService } from 'app/admin-view/shared/session.service';
import { ControlChartService } from 'app/admin-view/shared/controlChart.service';
import { PartyServiceService } from 'app/admin-view/shared/party-service.service';
import { NewsService } from 'app/admin-view/shared/news.service';
import { ReportsService } from 'app/admin-view/shared/reports.service';
// import { LoginComponent } from './login/login.component';
// import { AdminViewComponent } from './admin-view/admin-view.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    CommonModule,
    FormsModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    // LoginComponent,
    // AdminViewComponent,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
  CandidateDailyExpenseComponent,
  ExpenseService,
  FormBuilder,
  FundCollectionDetailsComponent,
  LocalBodyComponent,
  LolocalBodyTableComponent,
  LocalBodyService,
  AuthenticationService,
  EncryptionService,
  AuthGaurdService,
  SessionService,
  ControlChartService,
  PartyServiceService,
  NewsService,
  ReportsService
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
