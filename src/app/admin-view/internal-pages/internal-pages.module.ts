import { NgModule } from '@angular/core';
import { InternalPagesRoutingModule } from 'app/admin-view/internal-pages/internal-pages-routing.module';
import { DailyExpenseTableComponent } from './daily-expense-table/daily-expense-table.component';
import { CommonModule } from '@angular/common/src/common_module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidateDailyExpenseComponent } from './candidate-daily-expense/candidate-daily-expense.component';
import { FundCollectionDetailsComponent } from './fund-collection-details/fund-collection-details.component';
import { FundCollectionTableComponent } from './fund-collection-table/fund-collection-table.component';
import { ExtraDetailsComponent } from './extra-details/extra-details.component';
import { PersonalExpenseComponent } from './personal-expense/personal-expense.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import { Proforma1Component } from './proforma1/proforma1.component';
import { Proforma3Component } from './proforma3/proforma3.component';
import { Proforma4Component } from './proforma4/proforma4.component';
import { Proforma2Component } from './proforma2/proforma2.component';
import { DeviationComponent } from './deviation/deviation.component';
import {Ng2PaginationModule} from 'ng2-pagination';
import { LoadingModule } from 'ngx-loading';
import { LocalBodyComponent } from 'app/admin-view/internal-pages/local-body/local-body.component';
import { LolocalBodyTableComponent } from 'app/admin-view/internal-pages/lolocal-body-table/lolocal-body-table.component';
import { ControlChartComponent } from 'app/admin-view/internal-pages/control-chart/control-chart.component';
import { Proforma5Component } from './proforma5/proforma5.component';
import { Proforma6Component } from './proforma6/proforma6.component';
import { Proforma7Component } from './proforma7/proforma7.component';
import { Proforma8Component } from './proforma8/proforma8.component';
import { Proforma9Component } from './proforma9/proforma9.component';
import { PartyFundDetailsComponent } from './party-fund-details/party-fund-details.component';
import { PartyFundTableComponent } from './party-fund-table/party-fund-table.component';
import { AddPartyCandidateComponent } from './add-party-candidate/add-party-candidate.component';
import { PartyCandidateTableComponent } from './party-candidate-table/party-candidate-table.component';
import { UploadStandardRatesComponent } from './upload-standard-rates/upload-standard-rates.component';
import { PartyAdditionComponent } from 'app/admin-view/internal-pages/party-addition/party-addition.component';
import { PartyTableComponent } from 'app/admin-view/internal-pages/party-table/party-table.component';
import { PartyRepresentativeComponent } from 'app/admin-view/internal-pages/party-representative/party-representative.component';
import { PartyRepresentativeTableComponent } from 'app/admin-view/internal-pages/party-representative-table/party-representative-table.component';
import { UploadDownloadExpenseComponent } from 'app/admin-view/internal-pages/upload-download-expense/upload-download-expense.component';
import { OtpPasswordComponent } from './otp-password/otp-password.component';
import { AddOffersComponent } from './add-offers/add-offers.component';
import { VoterStatusReportComponent } from './voter-status-report/voter-status-report.component';
import { AddOffersTableComponent } from './add-offers-table/add-offers-table.component';
import { DetailsReportCountComponent } from './details-report-count/details-report-count.component';

@NgModule({
    imports: [
        InternalPagesRoutingModule,
         CommonModule,
         FormsModule,
         ReactiveFormsModule,
         ModalModule.forRoot(),
         Ng2PaginationModule,
         LoadingModule
        ],
    declarations: [
        DailyExpenseTableComponent,
        CandidateDailyExpenseComponent,
        FundCollectionDetailsComponent,
        FundCollectionTableComponent,
        ExtraDetailsComponent,
        PersonalExpenseComponent,
        Proforma1Component,
        Proforma3Component,
        Proforma4Component,
        Proforma2Component,
        DeviationComponent,
        LocalBodyComponent,
        LolocalBodyTableComponent,
        ControlChartComponent,
        Proforma5Component,
        Proforma6Component,
        Proforma7Component,
        Proforma8Component,
        Proforma9Component,
        PartyFundDetailsComponent,
        PartyFundTableComponent,
        AddPartyCandidateComponent,
        PartyCandidateTableComponent,
        UploadStandardRatesComponent,
        PartyAdditionComponent,
        PartyTableComponent,
        PartyRepresentativeComponent,
        PartyRepresentativeTableComponent,
        UploadDownloadExpenseComponent,
        OtpPasswordComponent,
        AddOffersComponent,
        VoterStatusReportComponent,
        AddOffersTableComponent,
        DetailsReportCountComponent
    ]
})
export class InternalPagesModule { }
