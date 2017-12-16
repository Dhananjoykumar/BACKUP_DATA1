import { Component, OnInit, transition } from '@angular/core';
import { PartyDetails } from 'app/admin-view/models/partyDetails';
import { ExpenseService } from 'app/admin-view/shared/expense.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExtraDetails } from 'app/admin-view/models/extraDetails';
import * as swal from 'sweetalert';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extra-details',
  templateUrl: './extra-details.component.html',
  styleUrls: ['./extra-details.component.scss']
})
export class ExtraDetailsComponent implements OnInit {

  titleAlert = 'This field is required';
  partyData: PartyDetails[];
  ExtraDetails: ExtraDetails[];
  extraDetail: ExtraDetails;
  extraDetails: FormGroup;
  date: Date;

  // extraDetails = new FormGroup({
  //   Name: new FormControl({value: '', disabled: true}, Validators.required),
  //   MobileNo: new FormControl({value: '', disabled: true}, Validators.required),
  //   Age: new FormControl('', Validators.required),
  //   NominationDate: new FormControl('', Validators.required),
  //   ElectionDate: new FormControl('', Validators.required),
  //   FatherName: new FormControl('', Validators.required),
  //   Place: new FormControl('', Validators.required),
  //   PartyTypeID: new FormControl('', Validators.required),
  //   PartyNameID: new FormControl('', Validators.required),
  //   SeatNoID: new FormControl('', Validators.required),
  //   ResultDate: new FormControl('', Validators.required),
  //   BankName: new FormControl('', Validators.required),
  //   BankAccNo: new FormControl('', Validators.required)
  // });

  constructor(private _expService: ExpenseService, private _fb: FormBuilder, private router: Router) {
    // this.extraDetails.patchValue({Name: 'Ramesh'}),
    // this.extraDetails.patchValue({MobileNo: '7741909862'})
  }

  ngOnInit() {
    this.extraDetails = this._fb.group({
      Name: [{ value: 'Ramesh', disabled: true }],
      MobileNo: [{ value: '7741909862', disabled: true }],
      Age: ['', Validators.required],
      NominationDate: ['', Validators.required],
      ElectionDate: ['', Validators.required],
      FatherName: ['', Validators.required],
      Place: ['', Validators.required],
      PartyTypeID: ['', Validators.required],
      PartyNameID: ['', Validators.required],
      SeatNoID: ['', Validators.required],
      ResultDate: ['', Validators.required],
      BankName: ['', Validators.required],
      BankAccNo: ['', Validators.required]
    });
  }

  getPartyName() {
    let partyTypeData = <HTMLInputElement>document.getElementById('partyType');
    this._expService.getPartyName(+partyTypeData.value).subscribe(data => {
      this.partyData = data;
    });
  }

  InsertExtraDetails(extraData) {
    this.extraDetail = this.extraDetails.value;
    this.extraDetail.MobileNo = '7741909862';
    this.extraDetail.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
    this._expService.insertExtraDetails(this.extraDetail).subscribe(data => {
      this.ExtraDetails = data;
      if (this.ExtraDetails[0].Status == '106') {
        swal('Good', 'Extra Details Insertion Successful!!!!', 'success');
      } else if (this.ExtraDetails[0].Status == '103') {
        swal('Oops', 'Extra Details Insertion Failed!!!!', 'error');
      }
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

  checkNominationDate() {
    let data = this.extraDetails.controls['NominationDate'].value;

    this.date = new Date(moment(data).format('YYYY-MM-DD'));

    if (this.date > new Date()) {
      swal('Sorry!!!', 'You cannot select future Nomination Date!!!', 'error');
      this.extraDetails.controls['NominationDate'].setValue('');
    }
  }

  checkElectionDate() {
    let data = this.extraDetails.controls['ElectionDate'].value;

    this.date = new Date(moment(data).format('YYYY-MM-DD'));

    if (this.date < new Date()) {
      swal('Sorry!!!', 'You cannot select back dated Election Date!!!', 'error');
      this.extraDetails.controls['ElectionDate'].setValue('');
    }
  }

  cancelData() {
    this.router.navigateByUrl('/dashboard');
  }
}
