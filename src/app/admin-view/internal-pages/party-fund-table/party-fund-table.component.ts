import { Component, OnInit } from '@angular/core';
import { FundDetails } from 'app/admin-view/models/fundDetails';
import { PartyServiceService } from 'app/admin-view/shared/party-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-party-fund-table',
  templateUrl: './party-fund-table.component.html',
  styleUrls: ['./party-fund-table.component.scss']
})
export class PartyFundTableComponent implements OnInit {

  fundDetails: FundDetails[] = new Array<FundDetails>();
  fundDetail: FundDetails;

  constructor(private _partyService: PartyServiceService, private router: Router) {
    this.fundDetails = this._partyService.partyFundArray;
    console.log(this.fundDetails);
  }

  ngOnInit() {
  }

  editFund(fundId: number) {
    console.log(fundId);
    this.fundDetail = this._partyService.editFundData(fundId);
    this._partyService.storageEl = this.fundDetail;
    // this._partyService.editFundData(fundId);
    this.router.navigateByUrl('/pages/partyfunddetails');
  }

  activateFund(fundId: number) {
    console.log(fundId);
    this.fundDetail = this._partyService.editFundData(fundId);
    if (this.fundDetail != null) {
      if (this.fundDetail.IsActive == 0) {
        this.fundDetail.IsActive = 1;
      } else {
        this.fundDetail.IsActive = 0;
      }
    }
  }
}
