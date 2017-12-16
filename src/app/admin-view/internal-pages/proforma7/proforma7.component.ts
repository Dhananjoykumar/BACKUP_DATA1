import { Component, OnInit } from '@angular/core';
import { ExtraDetails } from 'app/admin-view/models/extraDetails';
import * as moment from 'moment';
import { ExpenseService } from 'app/admin-view/shared/expense.service';

@Component({
  selector: 'app-proforma7',
  templateUrl: './proforma7.component.html',
  styleUrls: ['./proforma7.component.scss']
})
export class Proforma7Component implements OnInit {

  extraDetails = new ExtraDetails;
  extraDetail: ExtraDetails[];
  currDate: any;

  constructor(private _expService: ExpenseService) {
    this.currDate = moment(new Date()).format('YYYY-MM-DD');
    this._expService.downloadExtraDetails().subscribe(data => {
      this.extraDetail = data;
      console.log(this.extraDetail);
      this.extraDetails = this.extraDetail[0];
    });
  }

  ngOnInit() {
  }

}
