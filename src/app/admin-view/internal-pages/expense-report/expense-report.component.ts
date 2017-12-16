import { Component, OnInit } from '@angular/core';
import { StateList } from 'app/admin-view/models/stateList';
import { DistrictList } from 'app/admin-view/models/districtList';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpenseService } from 'app/admin-view/shared/expense.service';
import { Expense } from 'app/admin-view/models/expense';
import { LocalBodyService } from 'app/admin-view/shared/local-body.service';
import { LocalBody } from 'app/admin-view/models/localbody';
import { ReportsService } from 'app/admin-view/shared/reports.service';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent implements OnInit {

  stateList: StateList[] = new Array<StateList>();
  distList: DistrictList[] = new Array<DistrictList>();
  localBodyList: LocalBody[] = new Array<LocalBody>();
  wardNo: number[];
  expense: Expense[];
  titleAlert = 'This field is required';
  expenseReport: FormGroup;

  constructor(private _fb: FormBuilder, private _expService: ExpenseService, 
              private _localBody: LocalBodyService, private _reportServce: ReportsService) {
    this._localBody.getStateList().subscribe(data => {
      this.stateList = data;
    });
  }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.expenseReport = this._fb.group({
      StateId: ['', Validators.required],
      DistId: ['', Validators.required],
      LocalBodyType: ['', Validators.required],
      LocalBodyId: ['', Validators.required],
      WardNo: ['', Validators.required],
      ReportType: ['', Validators.required],
      Date: [''],
      ExpenseType: ['']
    });
  }

  onReportChange() {
    if (this.expenseReport.controls['ReportType'].value == 4) {
      this._expService.getExpenseType().subscribe(data => {
        this.expense = data;
        console.log(data);
      });
    }
  }

  onStateChange() {
    const stateData = this.expenseReport.controls['StateId'].value;
    // console.log(stateData);
    this._localBody.getDistrict(+stateData).subscribe(data => {
      this.distList = data;
      console.log(data);
    });
  }

  onLocalBodyChange() {
    this.wardNo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  }

  onLocalBodyTypeChange() {
    const stateId = this.expenseReport.controls['StateId'].value;
    const distId = this.expenseReport.controls['DistId'].value;
    const localBodyType = this.expenseReport.controls['LocalBodyType'].value;

    this._localBody.downloadLocalBody(+stateId, +distId, +localBodyType).subscribe(data => {
      this.localBodyList = data;
      console.log(data);
    });
  }

  searchExpenseReport() {
    // console.log(this.expenseReport.value);
    this._reportServce.getExpenseReport(this.expenseReport.value);
  }
}
