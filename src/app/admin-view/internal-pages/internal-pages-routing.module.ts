import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyExpenseTableComponent } from 'app/admin-view/internal-pages/daily-expense-table/daily-expense-table.component';
import { CandidateDailyExpenseComponent } from 'app/admin-view/internal-pages/candidate-daily-expense/candidate-daily-expense.component';
import { FundCollectionDetailsComponent } from 'app/admin-view/internal-pages/fund-collection-details/fund-collection-details.component';
import { FundCollectionTableComponent } from 'app/admin-view/internal-pages/fund-collection-table/fund-collection-table.component';
import { ExtraDetailsComponent } from 'app/admin-view/internal-pages/extra-details/extra-details.component';
import { PersonalExpenseComponent } from 'app/admin-view/internal-pages/personal-expense/personal-expense.component';
import { Proforma1Component } from 'app/admin-view/internal-pages/proforma1/proforma1.component';
import { Proforma3Component } from 'app/admin-view/internal-pages/proforma3/proforma3.component';
import { Proforma4Component } from 'app/admin-view/internal-pages/proforma4/proforma4.component';
import { Proforma2Component } from 'app/admin-view/internal-pages/proforma2/proforma2.component';
import { DeviationComponent } from 'app/admin-view/internal-pages/deviation/deviation.component';
import { LocalBodyComponent } from 'app/admin-view/internal-pages/local-body/local-body.component';
import { LolocalBodyTableComponent } from 'app/admin-view/internal-pages/lolocal-body-table/lolocal-body-table.component';
import { ControlChartComponent } from 'app/admin-view/internal-pages/control-chart/control-chart.component';
import { AuthGaurdService } from 'app/admin-view/shared/auth-gaurd.service';
import { Proforma5Component } from 'app/admin-view/internal-pages/proforma5/proforma5.component';
import { Proforma6Component } from 'app/admin-view/internal-pages/proforma6/proforma6.component';
import { Proforma7Component } from 'app/admin-view/internal-pages/proforma7/proforma7.component';
import { Proforma8Component } from 'app/admin-view/internal-pages/proforma8/proforma8.component';
import { Proforma9Component } from 'app/admin-view/internal-pages/proforma9/proforma9.component';
import { PartyFundDetailsComponent } from 'app/admin-view/internal-pages/party-fund-details/party-fund-details.component';
import { PartyFundTableComponent } from 'app/admin-view/internal-pages/party-fund-table/party-fund-table.component';
import { AddPartyCandidateComponent } from 'app/admin-view/internal-pages/add-party-candidate/add-party-candidate.component';
import { PartyCandidateTableComponent } from 'app/admin-view/internal-pages/party-candidate-table/party-candidate-table.component';
import { UploadStandardRatesComponent } from 'app/admin-view/internal-pages/upload-standard-rates/upload-standard-rates.component';
import { PartyAdditionComponent } from 'app/admin-view/internal-pages/party-addition/party-addition.component';
import { PartyTableComponent } from 'app/admin-view/internal-pages/party-table/party-table.component';
import { PartyRepresentativeComponent } from 'app/admin-view/internal-pages/party-representative/party-representative.component';
import { PartyRepresentativeTableComponent } from 'app/admin-view/internal-pages/party-representative-table/party-representative-table.component';
import { UploadDownloadExpenseComponent } from 'app/admin-view/internal-pages/upload-download-expense/upload-download-expense.component';
import { OtpPasswordComponent } from 'app/admin-view/internal-pages/otp-password/otp-password.component';
import { AddOffersComponent } from 'app/admin-view/internal-pages/add-offers/add-offers.component';
import { VoterStatusReportComponent } from 'app/admin-view/internal-pages/voter-status-report/voter-status-report.component';
import { AddOffersTableComponent } from 'app/admin-view/internal-pages/add-offers-table/add-offers-table.component';
import { DetailsReportCountComponent } from 'app/admin-view/internal-pages/details-report-count/details-report-count.component';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Pages'
    },
    children: [
        {
            path: 'dailyexpensetable',
            component: DailyExpenseTableComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'DailyExpenseTable'
            }
        },
        {
            path: 'candidatedailyexpense',
            component: CandidateDailyExpenseComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'CandidateDailyExpense'
            }
        },
        {
            path: 'fundcollectiondetails',
            component: FundCollectionDetailsComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'FundCollection'
            }
        },
        {
            path: 'fundcollectiontable',
            component: FundCollectionTableComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'FundCollectionTable'
            }
        },
        {
            path: 'extradetails',
            component: ExtraDetailsComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'ExtraDetails'
            }
        },
        {
            path: 'personalexpense',
            component: PersonalExpenseComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'PersonalExpense'
            }
        },
        {
            path: 'proforma1',
            component: Proforma1Component,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Proforma 1'
            }
        },
        {
            path: 'proforma2',
            component: Proforma2Component,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Proforma 2'
            }
        },
        {
            path: 'proforma3',
            component: Proforma3Component,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Proforma 3'
            }
        },
        {
            path: 'proforma4',
            component: Proforma4Component,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Proforma 4'
            }
        },
        {
            path: 'proforma5',
            component: Proforma5Component,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Proforma 5'
            }
        },
        {
            path: 'proforma6',
            component: Proforma6Component,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Proforma 6'
            }
        },
        {
            path: 'proforma7',
            component: Proforma7Component,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Proforma 7'
            }
        },
        {
            path: 'proforma8',
            component: Proforma8Component,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Proforma 8'
            }
        },
        {
            path: 'proforma9',
            component: Proforma9Component,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Proforma 9'
            }
        },
        {
            path: 'deviation',
            component: DeviationComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Deviation'
            }
        },
        {
            path: 'local-body',
            component: LocalBodyComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'LOCALBODY'
            }
        },
        {
            path: 'local-body-table',
            component: LolocalBodyTableComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'LOCALBODY DATA'
            }
        },
        {
            path: 'controlChart',
            component: ControlChartComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Control Chart'
            },
        },
        {
            path: 'partyfunddetails',
            component: PartyFundDetailsComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Party Fund Details'
            },
        },
        {
            path: 'partyfundtable',
            component: PartyFundTableComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Party Fund Table'
            },
        },
        {
            path: 'addpartycandidate',
            component: AddPartyCandidateComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Add Party Candidate'
            },
        },
        {
            path: 'partycandidatetable',
            component: PartyCandidateTableComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Party Candidate Table'
            },
        },
        {
            path: 'uploadstandardrates',
            component: UploadStandardRatesComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Upload Standard Rates'
            },
        },
        {
            path: 'party-addition',
            component: PartyAdditionComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Add Party'
            }
        },
        {
            path: 'party-table',
            component: PartyTableComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'Party Table'
            }
        },
        {
            path: 'party-representative',
            component: PartyRepresentativeComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'party representative'
            }
        },
        {
            path: 'party-representative-table',
            component: PartyRepresentativeTableComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'party representative table'
            }
        },
        {
            path: 'upload-Download-Expense',
            component: UploadDownloadExpenseComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'uploadDownloadExpense'
            }
        },
        {
            path: 'otp-password',
            component: OtpPasswordComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'otp password'
            }
        },
        {
            path: 'addOffers',
            component: AddOffersComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'offers'
            }
        },
        {
            path: 'voterStatusReport',
            component: VoterStatusReportComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'voterStatusReport'
            }
        },
        {
            path: 'addOfferTable',
            component: AddOffersTableComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'addOfferTable'
            }
        },
        {
            path: 'reportCount',
            component: DetailsReportCountComponent,
            canActivate: [AuthGaurdService],
            data: {
                title: 'reportCount'
            }
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InternalPagesRoutingModule { }
