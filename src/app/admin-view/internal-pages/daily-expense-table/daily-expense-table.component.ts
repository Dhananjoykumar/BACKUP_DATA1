import { Component, OnInit, transition } from '@angular/core';
import { DailyExpense } from 'app/admin-view/models/dailyExpense';
import { Router } from '@angular/router';
import { CandidateDailyExpenseComponent } from 'app/admin-view/internal-pages/candidate-daily-expense/candidate-daily-expense.component';
import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';
import { FormGroup, FormControl } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms/src/form_builder';
import { Validators } from '@angular/forms/src/validators';
import { ExpenseService } from 'app/admin-view/shared/expense.service';
import { ExpenseData } from 'app/admin-view/models/expenseData';
import { SIDEBAR_TOGGLE_DIRECTIVES } from 'app/admin-view/commons/sidebar.directive';
import { ResultData } from 'app/admin-view/models/result';

@Component({
  selector: 'app-daily-expense-table',
  templateUrl: './daily-expense-table.component.html',
  styleUrls: ['./daily-expense-table.component.scss']
})
export class DailyExpenseTableComponent implements OnInit {

  tempExpenses: ExpenseData[];
  flag: boolean;
  data = new ExpenseData;
  tempExpense: ExpenseData[] = [];
  expenses: ExpenseData[];
  public loading = false;
  result: any[] = [];
  tempResult = new ResultData;

  editFundData = new FormGroup({
    serverId: new FormControl(''),
    Date: new FormControl(''),
    ExpenseTypeText: new FormControl(''),
    SubExpenseTypeText: new FormControl(''),
    Qty_Size_Area: new FormControl(''),
    Rate: new FormControl(''),
    PaymentModeText: new FormControl(''),
    TotalExpense: new FormControl(''),
    PaidAmount: new FormControl(''),
    InvoiceNo: new FormControl(''),
    FirmName: new FormControl(''),
    SourceOfExpense: new FormControl(''),
    PartyName: new FormControl(''),
    ExpensesBy: new FormControl(''),
    CandidateRole: new FormControl('')
  });

  constructor(private router: Router,
    public _dailyExp: CandidateDailyExpenseComponent,
    private _expenseService: ExpenseService) {
    this.getExpenseData();
  }

  ngOnInit() {
    this.flag = false;
  }

  getExpenseData() {
    this.loading = true;
    this._expenseService.getExpenseData().subscribe(data => {
      this.expenses = data;
      console.log(this.expenses);
      this.loading = false;
    });
  }

  addNewExpense() {
    this._expenseService.storageEl = '';
    this.router.navigateByUrl('/pages/candidatedailyexpense');
  }

  approveExpense(id) {
    for (let i = 0; i < this.expenses.length; i++) {
      if (this.expenses[i].serverId == id) {
        if (this.expenses[i].IsApproved == 0) {
          this.data.serverId = this.expenses[i].serverId;
          this.data.Status = 1;
          this.data.StatusType = 2;
          this.data.MobileNo = '7741909862';
          this.data.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
          // console.log(this.data);
          this._expenseService.verifyExpense(this.data).subscribe(data => {
            this.tempResult = data;
            // console.log(this.tempResult);
            if (this.tempResult[0].Status === '106') {
              swal('Success!!!', 'Record Verified!!!!', 'success');
              this.getExpenseData();
            } else {
              swal('Sorry...', 'Record Verification Failed!!!!', 'error');
              this.getExpenseData();
            }
          });
        } else {
          this.data.serverId = this.expenses[i].serverId;
          this.data.Status = 0;
          this.data.StatusType = 2;
          this.data.MobileNo = '7741909862';
          this.data.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
          // console.log(this.data);
          this._expenseService.verifyExpense(this.data).subscribe(data => {
            this.tempResult = data;
            // console.log(this.tempResult);
            if (this.tempResult[0].Status == '106') {
              swal('Success!!!', 'Record Rejected!!!!', 'success');
              this.getExpenseData();
            } else {
              swal('Sorry...', 'Record Rejection Failed!!!!', 'error');
              this.getExpenseData();
            }
          });
        }
      } else {
        continue;
      }
    }
  }

  publishExpense(id) {
    for (let i = 0; i < this.expenses.length; i++) {
      if (this.expenses[i].serverId == id) {
        if (this.expenses[i].IsActive == 0) {
          this.data.serverId = this.expenses[i].serverId;
          this.data.Status = 1;
          this.data.StatusType = 1;
          this.data.MobileNo = '7741909862';
          this.data.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
          // console.log(this.data);
          this._expenseService.verifyExpense(this.data).subscribe(data => {
            this.tempResult = data;
            // console.log(this.tempResult);
            if (this.tempResult[0].Status === '106') {
              swal('Success!!!', 'Record Published!!!!', 'success');
              this.getExpenseData();
            } else {
              swal('Sorry...', 'Record Publishing Failed!!!!', 'error');
              this.getExpenseData();
            }
          });
        } else {
          this.data.serverId = this.expenses[i].serverId;
          this.data.Status = 0;
          this.data.StatusType = 1;
          this.data.MobileNo = '7741909862';
          this.data.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
          // console.log(this.data);
          this._expenseService.verifyExpense(this.data).subscribe(data => {
            this.tempResult = data;
            // console.log(this.tempResult);
            if (this.tempResult[0].Status == '106') {
              swal('Success!!!', 'Record Unpublished!!!!', 'success');
              this.getExpenseData();
            } else {
              swal('Sorry...', 'Record Unpublishing Failed!!!!', 'error');
              this.getExpenseData();
            }
          });
        }
      } else {
        continue;
      }
    }
  }

  hoverData(data: string) {
    var fieldData = <HTMLInputElement>document.getElementById('expType');

    if (data != null) {
      // var temp: string = data;
      fieldData.title = data;
    }
  }

  editExpenseData(id: number) {
    console.log(id);
    this.flag = true;
    var result = this.expenses.filter(function (expense) {
      return expense.serverId === id;
    });
    this._expenseService.storageEl = result[0];
    console.log(result[0]);
    this.router.navigate(['/pages/candidatedailyexpense']);
  }

  showData(myModal, id: number) {
    myModal.show();
    let footerDiv = <HTMLInputElement>document.getElementById('modalfooter');
    var result = this.expenses.filter(function (expense) {
      return expense.serverId === id;
    });
    const expModel = result[0];
    this.data = expModel;
    if (this.data.IsPrinted == 1) {
      this.editFundData.patchValue({ Id: this.data.Id });
      this.editFundData.patchValue({ Date: this.data.Date });
      this.editFundData.patchValue({ ExpenseTypeText: this.data.ExpenseTypeText });
      this.editFundData.patchValue({ SubExpenseTypeText: this.data.SubExpenseTypeText });
      this.editFundData.patchValue({ Qty_Size_Area: this.data.Qty_Size_Area });
      this.editFundData.patchValue({ Rate: this.data.Rate });
      this.editFundData.patchValue({ TotalExpense: this.data.TotalExpense });
      this.editFundData.patchValue({ PaymentModeText: this.data.PaymentModeText });
      this.editFundData.patchValue({ PaidAmount: this.data.PaidAmount });
      this.editFundData.patchValue({ InvoiceNo: this.data.InvoiceNo });
      this.editFundData.patchValue({ FirmName: this.data.FirmName });
      this.editFundData.patchValue({ SourceOfExpense: this.data.SourceOfExpense });
      this.editFundData.patchValue({ CandidateRole: this.data.CandidateRole });
      this.editFundData.patchValue({ IsApproved: this.data.IsApproved });
      this.editFundData.patchValue({ IsPrinted: this.data.IsPrinted });
      this.editFundData.patchValue({ Status: this.data.Status });
    }
  }

  searchExpense() {
    let expIdData = <HTMLInputElement>document.getElementById('expenseid');
    let fromDateData = <HTMLInputElement>document.getElementById('fromdate');
    let tillDateData = <HTMLInputElement>document.getElementById('tilldate');

    if (expIdData.value == '' && fromDateData.value == '' && tillDateData.value == '') {
      swal('Woah!!!', 'Please do fill all fields to search...', 'warning');
    } else if ((fromDateData.value === '' && tillDateData.value !== '') || (fromDateData.value !== '' && tillDateData.value === '')) {
      /**&& expIdData.value != '' || (fromDateData.value == '' && tillDateData.value == '') */
      swal('Woah!!!', 'Please do fill all date fields to search...', 'warning');
    } else {
      this._expenseService.searchExpenseData(+expIdData.value, fromDateData.value, tillDateData.value)
        .subscribe(data => {
          this.tempExpenses = data;
          if (this.tempExpenses[0].Status == 107) {
            swal('Sorry!!!', 'No Data Exist for this search!!!!', 'info');
            this.expenses = [];
          } else if (this.tempExpenses[0].Status == 103) {
            swal('Error!!!', 'Something went wrong!!!!', 'error');
            this.expenses = [];
            expIdData.value = '';
            fromDateData.value = '';
          } else {
            swal('Success!!!', 'Data Found!!!', 'success');
            this.expenses = this.tempExpenses;
          }
        });
    }
    // <HTMLInputElement>document.getElementById('expenseid')
    // <HTMLInputElement>document.getElementById('fromdate').value = '';
    let i = <HTMLFormElement>document.getElementById('htmlData');
    i.reset();
  }

  selectData(id, event) {
    console.log(id);
    if (event.target.checked) {
      this._expenseService.storageArr = this.expenses.filter(function (expense) {
        return expense.Id = id;
      });
    }
    console.log(this._expenseService.storageArr);
  }

  selectAll(event) {

    //  this.result = this.expenses.filter(function (expense) {
    //   return expense.IsPrinted == 0;
    // });

    this.filterPrintedData();
    this.result.forEach(x => x.state = event.target.checked);

    console.log(this.result);

    // this.result.forEach(x => x.state = event.target.checked);
    // let checkData = <HTMLInputElement>document.getElementById('selectActive');
    // console.log(checkData);
    //   // for (let i = 0; i < this.expenses.length; i++) {
    //   // checkData.checked = true;
    //   this._expenseService.storageEl = this.expenses.filter(function (expense) {
    //     return expense.IsPrinted == 0;
    //   });
    //   console.log(this._expenseService.storageEl);
    //   // }
  }

  isAllChecked() {
    // return this.result.every(x => x.state);

    return this.result.every(x => x.state);
  }

  filterPrintedData() {
    this.result = this.expenses.filter(function (expense) {
      return expense.IsPrinted == 0;
    });
  }

  uncheckData(id) {
    let checkElement = <HTMLInputElement>document.getElementById('childCheck');
    console.log(id);
    // console.log(checkElement.value);
    console.log(checkElement.checked);
    this.tempExpense = this.expenses.filter(function (expense) {
      return expense.serverId == id;
    });
    console.log(this.tempExpense[0].IsApproved);
    // checkElement.value = '';
  }
  // checkData(id) {
  //   this._expenseService.storageEl.splice
  // }
}
