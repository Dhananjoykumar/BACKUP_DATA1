import { Component, OnInit } from '@angular/core';
import { StateList } from 'app/admin-view/models/stateList';
import { DistrictList } from 'app/admin-view/models/districtList';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalBodyService } from 'app/admin-view/shared/local-body.service';
import { Router } from '@angular/router';
import { ExpenseService } from 'app/admin-view/shared/expense.service';
import { Expense } from 'app/admin-view/models/expense';
import { ExpenseData } from 'app/admin-view/models/expenseData';
import { LocalBody } from 'app/admin-view/models/localbody';

@Component({
  selector: 'app-upload-download-expense',
  templateUrl: './upload-download-expense.component.html',
  styleUrls: ['./upload-download-expense.component.scss']
})
export class UploadDownloadExpenseComponent implements OnInit {

  stateList: StateList[];
  districtList: DistrictList[];
  expense: Expense[];
  expenseFormData: ExpenseData;
  localBodyList: LocalBody[] = new Array<LocalBody>();
  isEdit: boolean = false;
  uploadSubExpForm: FormGroup;
  titleAlert = 'This field is required';
  constructor(private _localBody: LocalBodyService, private _expservice: ExpenseService,
    private _fb: FormBuilder, private router: Router) {
    this._localBody.getStateList().subscribe(res => {
      this.stateList = res;
    });
  }
  ngOnInit() {
    this.initForm({});
  }


  initForm(expData) {
    this.uploadSubExpForm = this._fb.group({
      StateId: [expData.StateId || '', Validators.required],
      DistId: [expData.DistId || '', Validators.required],
      LocalBodyTypeId: [expData.LocalBodyTypeId || '', Validators.required],
      LocalBodyId: [expData.LocalBodyId || '', Validators.required],
      ExpenseType: [expData.ExpenseType || '', Validators.required],
      SubExpenseTypeText: [expData.SubExpenseTypeText || '', Validators.required]
    });
  }

  OnStateChange() {
    // get district on change of state id
    const getStateId = <HTMLInputElement>document.getElementById('selectStateId');
    this._localBody.getDistrict(+getStateId.value).subscribe(res => {
      this.districtList = res;
    });

    this._expservice.getExpenseTypeByState(+getStateId.value).subscribe(data => {
      this.expense = data;
    });
  }

  uploadSubExpData() {
    this.expenseFormData = this.uploadSubExpForm.value;
    console.log(this.expenseFormData);
  }

  onLocalBodyTypeChange() {
    const getStateId = <HTMLInputElement>document.getElementById('selectStateId');
    const getDistrictId = <HTMLInputElement>document.getElementById('selectDistrictId');
    const LocalBodyTypeId = <HTMLInputElement>document.getElementById('LocalBodyTypeId');
    this._localBody.downloadLocalBody(
      +getStateId.value, +getDistrictId.value, +LocalBodyTypeId.value).subscribe(res => {
        this.localBodyList = res;
      });
  }
}
