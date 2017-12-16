import { Component, OnInit, transition } from '@angular/core';
import { FundDetails } from 'app/admin-view/models/fundDetails';
import { ExpenseService } from 'app/admin-view/shared/expense.service';
import { ResultData } from 'app/admin-view/models/result';
import * as swal from 'sweetalert';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fund-collection-details',
  templateUrl: './fund-collection-details.component.html',
  styleUrls: ['./fund-collection-details.component.scss']
})
export class FundCollectionDetailsComponent implements OnInit {

  fundDetail = new FundDetails;
  tempFund = new FundDetails;
  fundDetails: FundDetails[];
  submitToggleCounter: number;
  editIndex;
  titleAlert = 'This field is required';
  isEditable: boolean;
  result: ResultData;
  Id: string;
  fundModel: any;
  fundCollection: FormGroup;

  // fundCollection = new FormGroup({
  //   Date: new FormControl('', Validators.required),
  //   FromWhom: new FormControl('', Validators.required),
  //   FundType: new FormControl('', Validators.required),
  //   PaidBy: new FormControl('', Validators.required),
  //   Amount: new FormControl('', Validators.required),
  //   CheckNo: new FormControl('', Validators.required),
  //   ProviderBankName: new FormControl('', Validators.required),
  //   ProviderName: new FormControl('', Validators.required),
  //   ProviderMobileNo: new FormControl('', Validators.required),
  //   Address: new FormControl('', Validators.required)
  // });

  constructor(private _expService: ExpenseService, private router: Router, private _fb: FormBuilder) {
    this.isEditable = false;
  }

  ngOnInit() {
    this.fundModel = this._expService.storageEl;
    if (this.fundModel) {
      this.Id = this.fundModel.FundID;
      this.isEditable = true;
      this.formInit(this.fundModel);
      this.editOnSelectFromItem(this.fundModel.FromWhom);
      this.editOnSelectPaidBy(this.fundModel.PaidBy);
    } else {
      this.isEditable = false;
      this.formInit({});
    }
  }

  formInit(fundData) {
    this.fundCollection = this._fb.group({
      FundID: [fundData.FundID || ''],
      Date: [fundData.Date || '', Validators.required],
      FromWhom: [fundData.FromWhom || '', Validators.required],
      FundType: [fundData.FundType || '', Validators.required],
      PaidBy: [fundData.PaidBy || '', Validators.required],
      Amount: [fundData.Amount || '', Validators.required],
      CheckNo: [fundData.CheckNo || ''],
      ProviderBankName: [fundData.ProviderBankName || ''],
      ProviderName: [fundData.ProviderName || ''],
      ProviderMobileNo: [fundData.ProviderMobileNo || ''],
      Address: [fundData.Address || '', Validators.required]
    });

    this.fundCollection.controls['PaidBy'].valueChanges.subscribe(data => {
      console.log('paid by value changes', data);
      if (data !== 2) {
        this.fundCollection.controls['CheckNo'].setValue(0);
      }
    });
  }

  onSelectFromItem() {
    var fieldName = <HTMLInputElement>document.getElementById('selectFrom');

    var bankName = <HTMLInputElement>document.getElementById('bankname-input');
    var bankLabel = <HTMLInputElement>document.getElementById('bankname-label');
    var providerName = <HTMLInputElement>document.getElementById('providername-input');
    var providerLabel = <HTMLInputElement>document.getElementById('providername-label');
    var providerMobNoName = <HTMLInputElement>document.getElementById('providermobno-input');
    var providerMobNoLabel = <HTMLInputElement>document.getElementById('providermobno-label');

    if (fieldName.value == '1' || fieldName.value == '2') {
      bankName.style.visibility = 'hidden';
      bankLabel.style.visibility = 'hidden';
      providerName.style.visibility = 'hidden';
      providerLabel.style.visibility = 'hidden';
      providerMobNoName.style.visibility = 'hidden';
      providerMobNoLabel.style.visibility = 'hidden';
    } else {
      bankName.style.visibility = 'visible';
      bankLabel.style.visibility = 'visible';
      providerName.style.visibility = 'visible';
      providerLabel.style.visibility = 'visible';
      providerMobNoName.style.visibility = 'visible';
      providerMobNoLabel.style.visibility = 'visible';
    }
  }

  onSelectPaidBy() {
    var fieldName = <HTMLInputElement>document.getElementById('selectPaidBy');

    var chequeDetails = <HTMLInputElement>document.getElementById('chequedetails-input');
    var chequeDetailsLabel = <HTMLInputElement>document.getElementById('chequedetails-label');

    if (this.Id == '' || this.Id == null) {
      if (fieldName.value != '2') {
        chequeDetails.style.visibility = 'hidden';
        chequeDetailsLabel.style.visibility = 'hidden';
      } else {
        chequeDetails.style.visibility = 'visible';
        chequeDetailsLabel.style.visibility = 'visible';
      }
    } else {
    //   swal({title: 'Are you sure?',
    //         text: 'Once changed, the corrosponding feild data is irretriveable!!',
    //         icon: 'warning',
    //         buttons: {
              
    //         }
    // });
      if (fieldName.value != '2') {
        chequeDetails.style.visibility = 'hidden';
        chequeDetailsLabel.style.visibility = 'hidden';
      } else {
        chequeDetails.style.visibility = 'visible';
        chequeDetailsLabel.style.visibility = 'visible';
      }
    }
  }

  insertFundDetail(fundModel) {
    var status: number;
    console.log(this.fundCollection.value);
    console.log(fundModel);

    if (fundModel.FundID == '' || fundModel.FundID == null) {
      fundModel.IMEINo = '0';
      fundModel.IsActive = 0;
      fundModel.MobileNo = '7741909862';
      fundModel.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
    } else {
      fundModel.IMEINo = '0';
      fundModel.MobileNo = '7741909862';
      fundModel.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
    }
    // this.fundDetail = this.fundCollection.value;
    // this.fundDetail.IMEINo = '0';
    // this.fundDetail.IsActive = 1;
    // this.fundDetail.MobileNo = '7741909862';
    // this.fundDetail.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
    this._expService.addFundDetails(fundModel).subscribe(data => {
      this.result = data;
      console.log(data[0]);
      status = +this.result[0].Status;
      if (status == 106) {
        // swal({title: 'Hurray',
        //       text: 'Fund Detail Insertion Successfull!!!!',
        //       icon: 'success'}).then((value) => {
        //         if (value) {
        swal('Okay', 'Fund Detail Insertion Successfull!!!!', 'success');
        this._expService.storageEl = '';
        this.router.navigateByUrl('/pages/fundcollectiontable');
        // }
        // });
        // this.router.navigateByUrl('/pages/fundcollectiontable');
      } else if (status == 105) {
        swal('Oops', 'Fund Detail Insertion Failed!!!!', 'error');
      }
    });
  }

  editOnSelectFromItem(fromWhom) {
    let bankName = <HTMLInputElement>document.getElementById('bankname-input');
    let bankLabel = <HTMLInputElement>document.getElementById('bankname-label');
    let providerName = <HTMLInputElement>document.getElementById('providername-input');
    let providerLabel = <HTMLInputElement>document.getElementById('providername-label');
    let providerMobNoName = <HTMLInputElement>document.getElementById('providermobno-input');
    let providerMobNoLabel = <HTMLInputElement>document.getElementById('providermobno-label');
    if (fromWhom == 1 || fromWhom == 2) {
      bankName.style.visibility = 'hidden';
      bankLabel.style.visibility = 'hidden';
      providerName.style.visibility = 'hidden';
      providerLabel.style.visibility = 'hidden';
      providerMobNoName.style.visibility = 'hidden';
      providerMobNoLabel.style.visibility = 'hidden';
    } else {
      bankName.style.visibility = 'visible';
      bankLabel.style.visibility = 'visible';
      providerName.style.visibility = 'visible';
      providerLabel.style.visibility = 'visible';
      providerMobNoName.style.visibility = 'visible';
      providerMobNoLabel.style.visibility = 'visible';
    }
  }

  editOnSelectPaidBy(paidBy) {
    let chequeDetails = <HTMLInputElement>document.getElementById('chequedetails-input');
    let chequeDetailsLabel = <HTMLInputElement>document.getElementById('chequedetails-label');

    if (paidBy == 2) {
      chequeDetails.style.visibility = 'visible';
      chequeDetailsLabel.style.visibility = 'visible';
    } else {
      chequeDetails.style.visibility = 'hidden';
      chequeDetailsLabel.style.visibility = 'hidden';
    }
  }


  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  cancelData() {
    this.router.navigateByUrl('/pages/fundcollectiontable');
  }
}
