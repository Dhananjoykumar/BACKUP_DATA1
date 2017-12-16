import { Injectable } from '@angular/core';
import { ExpenseData } from 'app/admin-view/models/expenseData';

@Injectable()
export class ReportsService {

  constructor() { }

  getExpenseReport(expData: ExpenseData) {
    console.log(expData);
  }

  getDiscripency(expData: ExpenseData) {
    console.log(expData);
  }
}
