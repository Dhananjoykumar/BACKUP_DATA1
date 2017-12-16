import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ExpenseService } from 'app/admin-view/shared/expense.service';
import { ExtraDetails } from 'app/admin-view/models/extraDetails';
import { ExpenseData } from 'app/admin-view/models/expenseData';
declare const $;

@Component({
  selector: 'app-proforma2',
  templateUrl: './proforma2.component.html',
  styleUrls: ['./proforma2.component.scss']
})
export class Proforma2Component implements OnInit {

  extraDetails = new ExtraDetails;
  extraDetail: ExtraDetails[];
  currDate: any;
  tempExpense: ExpenseData[] = new Array<ExpenseData>();
  expenseData: ExpenseData[] = new Array<ExpenseData>();
  personalTotalExpense: number;
  count: number;
  public loading: boolean;

  constructor(private _expService: ExpenseService) {
    this.currDate = moment(new Date()).format('YYYY-MM-DD');
    this._expService.downloadExtraDetails().subscribe(data => {
      this.extraDetail = data;
      this.extraDetails = this.extraDetail[0];
    });


    this.personalTotalExpense = 0;
    this.count = 0;
    this.loading = true;
    this._expService.getExpenseData().subscribe(data => {
      this.tempExpense = data;
      this.loading = false;
      for (let i = 0; i < this.tempExpense.length; i++) {
        if (this.tempExpense[i].IsActive == 1 && this.tempExpense[i].IsApproved == 1) {
          this.expenseData[this.count] = this.tempExpense[i];
          this.personalTotalExpense = this.personalTotalExpense + (+this.tempExpense[i].TotalExpense);
          this.count++;
        } else {
          continue;
        }
      }
    });
  }

  ngOnInit() {
  }

  Print() {
    var mywindow = window.open('', 'PRINT', 'height=800,width=1000');
    mywindow.document.write('<html><head><title> True Voter </title>');
    mywindow.document.write('<style type="text/css">#btnPrint { display: none; }' +
     '#dataTable thead th, #dataTable tbody td {border:1px solid #000; padding:0.5em;} #dataTable {border-collapse: collapse}'+
     '#footer{text-align: right;}</style>');
    mywindow.document.write('</head><body>');
    mywindow.document.write($('#divProformaData').html());
    mywindow.document.write('</body></html>');
    mywindow.print();
    mywindow.close();
    return true;
  }

}
