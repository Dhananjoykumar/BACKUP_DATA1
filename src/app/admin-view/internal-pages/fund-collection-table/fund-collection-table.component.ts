import { Component, OnInit } from '@angular/core';
import { FundDetails } from 'app/admin-view/models/fundDetails';
import { FundCollectionDetailsComponent } from 'app/admin-view/internal-pages/fund-collection-details/fund-collection-details.component';
import { Router } from '@angular/router';
import { ExpenseService } from 'app/admin-view/shared/expense.service';
import { FormGroup, FormControl } from '@angular/forms/src/model';
import { Validators } from '@angular/forms/src/validators';
import { validateConfig } from '@angular/router/src/config';
import { ResultData } from 'app/admin-view/models/result';
import { last } from '@angular/router/src/utils/collection';
import * as moment from 'moment';

@Component({
  selector: 'app-fund-collection-table',
  templateUrl: './fund-collection-table.component.html',
  styleUrls: ['./fund-collection-table.component.scss']
})
export class FundCollectionTableComponent implements OnInit {

  fundDetails: FundDetails[] = [];
  fundData = new FundDetails;
  updateIndex: number;
  result = new ResultData;
  public loading = false;

  editFundData = new FormGroup({
    Date: new FormControl('', Validators.required),
    FromWhomText: new FormControl('', Validators.required),
    FundTypeText: new FormControl('', Validators.required),
    Amount: new FormControl('', Validators.required),
    PaidBy: new FormControl('', Validators.required),
    CheckNo: new FormControl('', Validators.required),
    ProviderBankName: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),
    ProviderMobileNo: new FormControl('', Validators.required),
  });

  constructor(public fundDetailForm: FundCollectionDetailsComponent, private router: Router, private _expService: ExpenseService) {
    this.getFundData();
   }

  ngOnInit() {
  }

  addNewFund() {
    this.router.navigateByUrl('/pages/fundcollectiondetails');
  }

  getFundData() {
    this.loading = true;
    this._expService.getFundDetails().subscribe(data => {
      this.fundDetails = data;
      console.log(data);
      for (let i = 0;i < this.fundDetails.length; i++) {
        this.fundDetails[i].Date = moment(this.fundDetails[i].Date).format('YYYY-MM-DD');
      }
      this.loading = false;
    });
  }

  editFund(id: number) {
    console.log(id);
    var result = this.fundDetails.filter(function (fund){
      return fund.FundID === id;
    });
    this._expService.storageEl = result[0];
    console.log(this._expService.storageEl);
    this.router.navigateByUrl('/pages/fundcollectiondetails');
  }

  activateFund(id: number) {
    var result = this.fundDetails.filter(function(fund){
      return fund.FundID == id;
    });

    this.fundData = result[0];
    console.log(this.fundData);
    if (this.fundData.IsActive == 0) {
      this.fundData.IsActive = 1;
      this.fundData.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
      this._expService.activateFundData(this.fundData).subscribe(data => {
        this.result = data;
        if (this.result[0].Status == 106) {
          swal('Activated!!!', 'Record Activation Successful', 'success');
        } else {
          swal('Sorry!!!', 'Record Activation Failed', 'error');
        }
      });
    } else {
      this.fundData.IsActive = 0;
      this.fundData.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
      this._expService.activateFundData(this.fundData).subscribe(data => {
        this.result = data;
        if (this.result[0].Status == 106) {
          swal('Deactivated!!!', 'Record Deactivation Successful', 'success');
        } else {
          swal('Sorry!!!', 'Record Deactivation Failed', 'error');
        }
      });
    }
  }

  updateData(myModal) {
    this.fundData = this.editFundData.value;
    this.fundData.FundID = this.fundDetails[this.updateIndex].FundID;
    this.fundData.FromWhom = this.fundDetails[this.updateIndex].FromWhom;
    this.fundData.FundType = this.fundDetails[this.updateIndex].FundType;
    this.fundData.IsActive = this.fundDetails[this.updateIndex].IsActive;
    this.fundData.CreatedDate = this.fundDetails[this.updateIndex].CreatedDate;
    this.fundData.IMEINo = this.fundDetails[this.updateIndex].IMEINo;
    this.fundData.ModifiedBy = this.fundDetails[this.updateIndex].ModifiedBy;
    this.fundData.ModifiedDate = this.fundDetails[this.updateIndex].ModifiedDate;
    this.fundData.MobileNo = this.fundDetails[this.updateIndex].MobileNo;
    this.fundData.ProviderName = this.fundDetails[this.updateIndex].ProviderName;
    this.fundData.Status = "0";
    this.fundData.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
    this._expService.addFundDetails(this.fundData).subscribe(data => {
      this.result = data;

      let status: number;
      status = +this.result[0].Status;
      if (status === 106) {
        swal('Hurray', 'Record Updated!!!!', 'success');
      } else if (status === 105) {
        swal('Oops', 'Fund Detail Insertion Failed!!!!', 'error');
      }

      this.getFundData();
    });
    myModal.hide();
  }
}
