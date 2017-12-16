import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'app/admin-view/shared/expense.service';
import { ExpenseData } from 'app/admin-view/models/expenseData';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-expense',
  templateUrl: './personal-expense.component.html',
  styleUrls: ['./personal-expense.component.scss']
})
export class PersonalExpenseComponent implements OnInit {
  expenseDetails: ExpenseData[] = new Array<ExpenseData>();
  public loading: boolean;
  titleAlert = 'This field is required';
  IsPrint: boolean;
  personalExpense: FormGroup;

  constructor(private _expService: ExpenseService, private router: Router, private _fb: FormBuilder) {
    this.expenseDetails = [];
    this.IsPrint = false;
  }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.personalExpense = this._fb.group({
      Date: ['', Validators.required]
    });
  }

  searchExpense(data) {
    let dateData = this.personalExpense.controls['Date'].value;
    this.loading = true;
    this._expService.searchExpenseByDate(dateData).subscribe(data => {
      this.expenseDetails = data;
      this.loading = false;

      if (this.expenseDetails[0].Status == 106 || this.expenseDetails[0].Status == null) {
        if (this.expenseDetails.length > 0) {
          this.IsPrint = true;
        }
      } else {
        swal('Sorry!!!', 'No Data found for the specified date', 'error');
        this.IsPrint = false;
      }
    });
  }

  printExpenseData() {
    this._expService.storageArr = this.expenseDetails;
    this.router.navigateByUrl('/pages/proforma1');
    console.log('Data to be sent:', this._expService.storageArr);
  }

  cancelData() {
    this.router.navigateByUrl('/dashboard');
  }
}

