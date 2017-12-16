import { Component, OnInit } from '@angular/core';
import { FundDetails } from 'app/admin-view/models/fundDetails';
import { PartyServiceService } from 'app/admin-view/shared/party-service.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ResultData } from 'app/admin-view/models/result';

@Component({
  selector: 'app-party-fund-table',
  templateUrl: './party-fund-table.component.html',
  styleUrls: ['./party-fund-table.component.scss']
})
export class PartyFundTableComponent implements OnInit {

  fundDetails: FundDetails[] = new Array<FundDetails>();
  fundDetail: FundDetails;
  result = new ResultData;

  constructor(private _partyService: PartyServiceService, private router: Router) {
    this.fundDetails = this._partyService.partyFundArray;
    // console.log(this.fundDetails);
    this.downloadPartyFundDetails();
    // console.log(this.fundDetails);
  }

  ngOnInit() {
  }

  editFund(fundId: number) {
    console.log(fundId);
    var result = this.fundDetails.filter(function(fund){
      return fund.FundID = fundId;
    });
    // this.fundDetail = this._partyService.editFundData(fundId);
    this._partyService.storageEl = result[0];
    console.log(this._partyService.storageEl);
    // this._partyService.editFundData(fundId);
    this.router.navigateByUrl('/pages/partyfunddetails');
  }

  activateFund(fundId: number) {
    var result = this.fundDetails.filter(function(fund){
      return fund.FundID == fundId;
    });
    this.fundDetail = result[0];
    console.log(this.fundDetail);
    if (this.fundDetail != null) {
      if (this.fundDetail.IsActive == 0) {
        this.fundDetail.IsActive = 1;
        this.fundDetail.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
        this._partyService.activatePartyFundDetails(this.fundDetail).subscribe(data => {
          this.result = data;
          if (this.result[0].Status == '106') {
            swal('Activated!!!!', 'Party Fund Record is Activated!!!!!', 'success');
          } else {
            swal('Sorry!!!!', 'Party Fund Activation Failed!!!!!', 'error');
          }
        });
      } else {
        this.fundDetail.IsActive = 0;
        this.fundDetail.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
        this._partyService.activatePartyFundDetails(this.fundDetail).subscribe(data => {
          this.result = data;
          if (this.result[0].Status == '106') {
            swal('Deactivated!!!!', 'Party Fund Record is Deactivated!!!!!', 'success');
          } else {
            swal('Sorry!!!!', 'Party Fund Deactivation Failed!!!!!', 'error');
          }
        });
      }
    }
  }

  addNewFund() {
    this.router.navigateByUrl('/pages/partyfunddetails');
  }

  downloadPartyFundDetails() {
    this._partyService.downloadPartyFundDetails().subscribe(data => {
      this.fundDetails = data;
      for (let i = 0; i < this.fundDetails.length; i++) {
        this.fundDetails[i].Date = moment(this.fundDetails[i].Date).format('YYYY-MM-DD');
      }
      console.log(this.fundDetails);
    });
  }
}
