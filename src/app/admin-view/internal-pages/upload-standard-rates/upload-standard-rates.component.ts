import { Component, OnInit } from '@angular/core';
import { LocalBodyService } from 'app/admin-view/shared/local-body.service';
import { ExpenseService } from 'app/admin-view/shared/expense.service';
import { ExpenseData } from 'app/admin-view/models/expenseData';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateList } from 'app/admin-view/models/stateList';
import { DistrictList } from 'app/admin-view/models/districtList';
import { Router } from '@angular/router';
import { LocalBody } from 'app/admin-view/models/localbody';

@Component({
  selector: 'app-upload-standard-rates',
  templateUrl: './upload-standard-rates.component.html',
  styleUrls: ['./upload-standard-rates.component.scss']
})
export class UploadStandardRatesComponent implements OnInit {

  isEditable: boolean;
  uploadStdRates: FormGroup;
  titleAlert = 'This field is required';
  stateList: StateList[] = new Array<StateList>();
  distList: DistrictList[] = new Array<DistrictList>();
  expense: ExpenseData[] = new Array<ExpenseData>();
  subExp: ExpenseData[] = new Array<ExpenseData>();
  localBodyList: LocalBody[] = new Array<LocalBody>();

  constructor(private _localBody: LocalBodyService, private _expService: ExpenseService,
    private _fb: FormBuilder, private router: Router) {
    this._localBody.getStateList().subscribe(data => {
      this.stateList = data;
      console.log(this.stateList);
    });
  }

  ngOnInit() {
    this.isEditable = false;
    this.formInit({});
  }

  formInit(stdRate) {
    this.uploadStdRates = this._fb.group({
      StateId: ['', Validators.required],
      DistId: ['', Validators.required],
      LocalBodyType: ['', Validators.required],
      LocalBodyId: ['', Validators.required],
      ExpenseType: ['', Validators.required],
      SubExpenseType: ['', Validators.required],
      Unit: ['', Validators.required],
      Rate: ['', Validators.required]
    });
  }

  onStateChange() {
    // this.uploadStdRates.controls['selectState'].valueChanges.subscribe(data => {
    //   this._localBody.getDistrict(data).subscribe(data => {
    //       this.distList = data;
    //     });
    // });
    let stateData = <HTMLInputElement>document.getElementById('selectState');
    this._localBody.getDistrict(+stateData.value).subscribe(data => {
      this.distList = data;
      console.log(data);
    });

    this._expService.getExpenseTypeByState(+stateData.value).subscribe(data => {
      this.expense = data;
    });
  }

  onExpenseChange() {
    let expData = <HTMLInputElement>document.getElementById('selectExpenseHead');

    this._expService.getSubExpenseType(+expData.value).subscribe(data => {
      this.subExp = data;
      console.log(this.subExp);
    });
  }

  insertPartyCandidate(stdRate) {
    // console.log(stdRate);
    this._expService.uploadStdRate(stdRate);
    this.formInit({});
  }

  onLocalBodyTypeChange() {
    const stateId = this.uploadStdRates.controls['StateId'].value;
    const distId = this.uploadStdRates.controls['DistId'].value;
    const localBodyType = this.uploadStdRates.controls['LocalBodyType'].value;
    console.log(stateId);

    this._localBody.downloadLocalBody(+stateId, +distId, +localBodyType).subscribe(data => {
      this.localBodyList = data;
      console.log(data);
    });
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
    this.router.navigateByUrl('/dashboard');
  }
}
