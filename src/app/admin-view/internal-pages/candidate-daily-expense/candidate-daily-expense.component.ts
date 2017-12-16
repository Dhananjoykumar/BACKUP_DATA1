import { Component, OnInit, transition } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms/src/model';
import { Expansion } from '@angular/compiler/src/ml_parser/ast';
import { Expense } from 'app/admin-view/models/expense';
import { ExpenseService } from 'app/admin-view/shared/expense.service';
import { SubExpenses } from 'app/admin-view/models/subExpense';
import { FormBuilder } from '@angular/forms/src/form_builder';
import { ExpenseData } from 'app/admin-view/models/expenseData';
import { ResultData } from 'app/admin-view/models/result';
import { DailyExpense } from 'app/admin-view/models/dailyExpense';
import * as swal from 'sweetalert';
import { Router } from '@angular/router/src/router';
import { Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-candidate-daily-expense',
  templateUrl: './candidate-daily-expense.component.html',
  styleUrls: ['./candidate-daily-expense.component.scss']
})
export class CandidateDailyExpenseComponent implements OnInit {
  flaged: boolean;
  index: number;
  expenseData: ExpenseData[] = new Array<ExpenseData>();
  expense: Expense[];
  subExp: SubExpenses[];
  data: ExpenseData;
  result: ResultData;
  data1 = new ExpenseData;
  flag: boolean;
  date: Date;
  candidateExpenseForm: FormGroup;
  titleAlert = 'This field is required';

  constructor(private _expservice: ExpenseService,
               private _fb: FormBuilder,
               private router: Router)
               {
                  this._expservice.getExpenseType().subscribe(data => {
                    this.expense = data;
                  });
                }


  ngOnInit() {
    this.flag = false;
    var expModel;
    expModel = this._expservice.storageEl;
    if (expModel) {
      this.flag = true;
      this.initForm(expModel);
      this.onEditExpenseChange(expModel.ExpenseType);
      this.onEditReadOnlyActivate(expModel.PaymentType);
      this.onEditCheckPaymentMode(expModel.PaymentMode);
      this.onEditCheckSourceOfExpense(expModel.SourceOfExpense);
    } else {
      this.flag = false;
      this.initForm({});
      this.onEditExpenseChange(1);
      this.onEditReadOnlyActivate(1);
      this.onEditCheckPaymentMode(1);
      this.onEditCheckSourceOfExpense('Self ');
    }
  }

  initForm(expenseData) {
    this.candidateExpenseForm = this._fb.group({
      Date: [ expenseData.Date || '', Validators.required],
      ExpenseType: [expenseData.ExpenseType || '', Validators.required],
      SubExpenseType: [expenseData.SubExpenseType || '', Validators.required],
      StandardRate: [{value: expenseData.StandardRate, disabled: true} || ''],
      Unit: [{value: expenseData.Unit, disabled: true} || ''],
      Qty_Size_Area: [expenseData.Qty_Size_Area || '', Validators.required],
      Rate: [expenseData.Rate || '', Validators.required],
      PaymentType: [expenseData.PaymentType || '', Validators.required],
      PaymentMode: [expenseData.PaymentMode || '', Validators.required],
      ChequeNo: [expenseData.ChequeNo || ''],
      TotalExpense: [{value: expenseData.TotalExpense, disabled: true} || ''],
      PaidAmount: [expenseData.PaidAmount || '', Validators.required],
      BalancePayment: [{value: expenseData.BalancePayment, disabled: true} || ''],
      InvoiceNo: [expenseData.InvoiceNo || '', Validators.required],
      FirmName: [expenseData.FirmName || '', Validators.required],
      FirmOwnerMobNo: [expenseData.FirmOwnerMobNo || '', Validators.required],
      SourceOfExpense: [expenseData.SourceOfExpense || '', Validators.required],
      PartyName: [expenseData.PartyName || ''],
      PartyNo: [expenseData.PartyNo || ''],
      Description: [expenseData.Description || ''],
      ReffrenceMobile: [expenseData.ReffrenceMobile || ''],
      InsertedBy: [expenseData.InsertedBy || ''],
      LocalBodyId: [expenseData.LocalBodyId || ''],
      LocalBodyType: [expenseData.LocalBodyType || ''],
      DistId: [expenseData.DistId || ''],
      WardNo: [expenseData.WardNo || ''],
      CandidateRole: [expenseData.CandidateRole || ''],
      IsActive: [expenseData.IsActive || ''],
      IsApproved: [expenseData.IsApproved || ''],
      IsPrinted: [expenseData.IsPrinted || ''],
      serverId: [expenseData.serverId || '']
    });
  }


  readOnlyActive() {
    var fieldElement = <HTMLInputElement>document.getElementById('amount-input');
    var balanaceLabel = <HTMLInputElement>document.getElementById('balance-label');
    var balanceInput = <HTMLInputElement>document.getElementById('balance-input');
    var radioElement = <HTMLInputElement>document.getElementById('full-payment');
    let totalData = <HTMLInputElement>document.getElementById('total-input');
    if (radioElement.checked == true) {
      fieldElement.disabled = true;
      fieldElement.value = totalData.value;
      balanaceLabel.hidden = true;
      balanceInput.hidden = true;
    }
  }

  readOnlyDeactive() {
    var fieldElement = <HTMLInputElement>document.getElementById('amount-input');
    var balanaceLabel = <HTMLInputElement>document.getElementById('balance-label');
    var balanceInput = <HTMLInputElement>document.getElementById('balance-input');
    var radioElement = <HTMLInputElement>document.getElementById('partial-payment');
    if (radioElement.checked == true) {
      fieldElement.disabled = false;
      fieldElement.value = '';
      balanaceLabel.hidden = false;
      balanceInput.hidden = false;
    }
  }

  onEditReadOnlyActivate(paymentType) {
    let balanaceLabel = <HTMLInputElement>document.getElementById('balance-label');
    let balanceInput = <HTMLInputElement>document.getElementById('balance-input');
    let fieldElement = <HTMLInputElement>document.getElementById('amount-input');
      if (paymentType == 1) {
        balanaceLabel.hidden = true;
        balanceInput.hidden = true;
        fieldElement.disabled = true;
      } else if (paymentType == 2) {
        balanaceLabel.hidden = false;
        balanceInput.hidden = false;
        balanceInput.disabled = true;
        fieldElement.disabled = false;
      }
  }

  checkPaymentMode() {
    var radioCashElement = <HTMLInputElement>document.getElementById('cash');
    var radioChequeElement = <HTMLInputElement>document.getElementById('cheque');
    var radioCardElement = <HTMLInputElement>document.getElementById('card');
    var chequeLabel = <HTMLInputElement>document.getElementById('cheque-label');
    var chequeInput = <HTMLInputElement>document.getElementById('cheque-input');
    if (radioChequeElement.checked == false) {
      chequeLabel.hidden = true;
      chequeInput.hidden = true;
    } else {
      chequeLabel.hidden = false;
      chequeInput.hidden = false;
    }
  }

  onEditCheckPaymentMode(paymentMode) {
    let chequeLabel = <HTMLInputElement>document.getElementById('cheque-label');
    let chequeInput = <HTMLInputElement>document.getElementById('cheque-input');
    if (paymentMode == 1 || paymentMode == 3) {
      chequeLabel.hidden = true;
      chequeInput.hidden = true;
    } else {
      chequeLabel.hidden = false;
      chequeInput.hidden = false;
    }
  }

  checkSourceOfExpense() {
    var radioSelf = <HTMLInputElement>document.getElementById('self-radio');
    var personNameLabel = <HTMLInputElement>document.getElementById('personname-label');
    var personMobNoLabel = <HTMLInputElement>document.getElementById('personmobno-label');
    var personNameInput = <HTMLInputElement>document.getElementById('person-name');
    var personMobNoInput = <HTMLInputElement>document.getElementById('person-mobno');
    if (radioSelf.checked == true) {
      personNameLabel.hidden = true;
      personMobNoLabel.hidden = true;
      personNameInput.hidden = true;
      personMobNoInput.hidden = true;
    } else {
      personNameLabel.hidden = false;
      personMobNoLabel.hidden = false;
      personNameInput.hidden = false;
      personMobNoInput.hidden = false;
    }
  }

  onEditCheckSourceOfExpense(sourceOfExpense) {
    let personNameLabel = <HTMLInputElement>document.getElementById('personname-label');
    let personMobNoLabel = <HTMLInputElement>document.getElementById('personmobno-label');
    let personNameInput = <HTMLInputElement>document.getElementById('person-name');
    let personMobNoInput = <HTMLInputElement>document.getElementById('person-mobno');

    if (sourceOfExpense === 'Self ') {
      personNameLabel.hidden = true;
      personMobNoLabel.hidden = true;
      personNameInput.hidden = true;
      personMobNoInput.hidden = true;
    } else {
      personNameLabel.hidden = false;
      personMobNoLabel.hidden = false;
      personNameInput.hidden = false;
      personMobNoInput.hidden = false;
    }
  }

  onExpenseChange() {
    var selectExpense = <HTMLInputElement>document.getElementById('selectExpenseHead');
    var stdRate = <HTMLInputElement>document.getElementById('standardrate-input');
    console.log(selectExpense.value);
    this._expservice.getSubExpenseType(+selectExpense.value).subscribe(data => {
      this.subExp = data;
    });
  }

  onEditExpenseChange(expId) {
    this._expservice.getSubExpenseType(expId).subscribe(data => {
      this.subExp = data;
    });
  }

  onSubExpenseChange() {
    var subSelectExpense = <HTMLInputElement>document.getElementById('selectExpensesSubHead');
    console.log(subSelectExpense.value);
    var stdRate = <HTMLInputElement>document.getElementById('standardrate-input');
    var stdUnit = <HTMLInputElement>document.getElementById('unit-input');
    for (let i = 0;i < this.subExp.length; i++) {
        if (subSelectExpense.value == this.subExp[i].SEID) {
          stdRate.value = this.subExp[i].StandardRate;
          stdUnit.value = this.subExp[i].MeasuringUnit;
        }
    }
  }

  saveDailyExp(expModel) {
    let totalData = <HTMLInputElement>document.getElementById('total-input');
    let fieldElement = <HTMLInputElement>document.getElementById('amount-input');
    let balanceInput = <HTMLInputElement>document.getElementById('balance-input');
    let stdRateData =  <HTMLInputElement>document.getElementById('standardrate-input');
    let unitData = <HTMLInputElement>document.getElementById('unit-input');
    // if (isValid) {
      // console.log(expModel);
      if (expModel.serverId == '' || expModel.serverId == null) {
        expModel.StandardRate = stdRateData.value;
        expModel.Unit = unitData.value;
        expModel.TotalExpense = totalData.value;
        expModel.PaidAmount = fieldElement.value;
        expModel.BalancePayment = balanceInput.value;
        expModel.MobileNo = '7741909862';
        expModel.DistId = '517';
        expModel.LocalBodyType = '1';
        expModel.LocalBodyId = '14007';
        expModel.WardNo = '12';
        expModel.CandidateRole = '2';
        expModel.IsActive = '0';
        expModel.IsApproved = '0';
        expModel.IsPublished = '0';
        expModel.ReffrenceMobile = '7741909862';
        expModel.InsertedBy = '7741909862';
        expModel.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
      } else {
        console.log('Edit Data: ', expModel);
        expModel.StandardRate = stdRateData.value;
        expModel.Unit = unitData.value;
        expModel.TotalExpense = totalData.value;
        expModel.PaidAmount = fieldElement.value;
        expModel.BalancePayment = balanceInput.value;
        expModel.MobileNo = '7741909862';
        expModel.DistId = '517';
        expModel.LocalBodyType = '1';
        expModel.LocalBodyId = '14007';
        expModel.WardNo = '12';
        expModel.CandidateRole = '2';
        expModel.ReffrenceMobile = '7741909862';
        expModel.InsertedBy = '7741909862';
        expModel.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
      }
      console.log(expModel);
      this._expservice.addExpenseData(expModel).subscribe(data => {
        this.result = data;
        if (this.result[0].Status === '106') {
          swal({title: 'Success',
          text: 'Data is saved!!!!',
          icon: 'success'}).then((value) => {
            if (value) {
              this._expservice.storageEl = '';
              this.router.navigateByUrl('/pages/dailyexpensetable');
            }
          });
          this.candidateExpenseForm.reset();
        } else {
          swal('Error', 'Data insertion failed', 'error');
        }
      });
  }

  calculateAmount() {
    let quantityData = <HTMLInputElement>document.getElementById('quantity');
    let rateData = <HTMLInputElement>document.getElementById('rate-input');
    let totalData = <HTMLInputElement>document.getElementById('total-input');
    if (quantityData.value != null && rateData != null) {
      let ans = parseFloat(quantityData.value) * parseFloat(rateData.value);
      totalData.value = ans.toString();
    }
  }

  calculateBalance() {
    let totalData = <HTMLInputElement>document.getElementById('total-input');
    let amountData = <HTMLInputElement>document.getElementById('amount-input');
    let balData = <HTMLInputElement>document.getElementById('balance-input');
    let ans = parseFloat(totalData.value) - parseFloat(amountData.value);
    if (ans < 0) {
      swal('Sorry!!!', 'Amount exceeds the Total', 'error');
      this.candidateExpenseForm.controls['PaidAmount'].setValue('');
      this.candidateExpenseForm.controls['BalancePayment'].setValue('');
    } else {
      balData.value = ans.toString();
    }
  }

  hideElementsOnInit() {
    let balanaceLabel = <HTMLInputElement>document.getElementById('balance-label');
    let balanceInput = <HTMLInputElement>document.getElementById('balance-input');
    let personNameLabel = <HTMLInputElement>document.getElementById('personname-label');
    let personMobNoLabel = <HTMLInputElement>document.getElementById('personmobno-label');
    let personNameInput = <HTMLInputElement>document.getElementById('person-name');
    let personMobNoInput = <HTMLInputElement>document.getElementById('person-mobno');
    let chequeLabel = <HTMLInputElement>document.getElementById('cheque-label');
    let chequeInput = <HTMLInputElement>document.getElementById('cheque-input');
    let amountLabel = <HTMLInputElement>document.getElementById('amount-label');
    let amountInput = <HTMLInputElement>document.getElementById('amount-input');
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
    this.router.navigateByUrl('/pages/dailyexpensetable');
  }
}

