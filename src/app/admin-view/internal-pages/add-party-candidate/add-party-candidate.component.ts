import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExtraDetails } from 'app/admin-view/models/extraDetails';
import { ExpenseService } from 'app/admin-view/shared/expense.service';
import { PartyServiceService } from 'app/admin-view/shared/party-service.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-add-party-candidate',
  templateUrl: './add-party-candidate.component.html',
  styleUrls: ['./add-party-candidate.component.scss']
})
export class AddPartyCandidateComponent implements OnInit {

  isEditable: boolean;
  date: Date;
  addPartyCandidate: FormGroup;
  extraDetail: ExtraDetails;
  counter: number;
  titleAlert = 'This field is required';

  constructor(private _fb: FormBuilder, 
    private _expService: ExpenseService, 
    private _partyService: PartyServiceService,
    private router: Router) {
      this.counter = 0;
    this._expService.downloadExtraDetails().subscribe(data => {
      this.extraDetail = data;
    });
  }

  ngOnInit() {
    this.isEditable = false;
    var data = this._partyService.storageEl;
    console.log(data);
    if (data) {
      this.formInit(data);
      this.isEditable = true;
    } else {
      this.formInit({});
    }
  }

  formInit(candidateData) {
    this.addPartyCandidate = this._fb.group({
      DistName: [candidateData.DistName || 'Amravati'],
      LocalBodyIdText: [candidateData.LocalBodyText || 'Municiple Corporation'],
      LocalBodyTypeText: [candidateData.LocalBodyTypeText || '13705-Amravati Mahanagarpalika'],
      PartyTypeText: [candidateData.PartyTypeText || 'National Parties'],
      PartyNameText: [candidateData.PartyNameText || 'jay Ho'],
      ElectionTypeId: [candidateData.ElectionTypeId || '', Validators.required],
      ElectionTypeText: [candidateData.ElectionTypeText || ''],
      WardNo: [candidateData.WardNo || '', Validators.required],
      SeatNo: [candidateData.SeatNo || '', Validators.required],
      ElectionDate: [candidateData.ElectionDate || '', Validators.required],
      CandidateName: [candidateData.CandidateName || '', Validators.required],
      VerifiedId: [candidateData.VerifiedId || '', Validators.required],
      NomiWithdrawId: [candidateData.NomiWithdrawId || '', Validators.required],
      ElectionResultId: [candidateData.ElectionResultId || '', Validators.required],
      IsActive: [candidateData.IsActive || '0']
    });
  }

  insertPartyCandidate(candidateDetails) {
    console.log(this.addPartyCandidate.value);
    console.log(candidateDetails);
    this._partyService.addPartyCandidate(this.addPartyCandidate.value);
    this.router.navigateByUrl('/pages/partycandidatetable');
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
    this.router.navigateByUrl('/pages/partycandidatetable');
  }

  checkElectionDate() {
    let data = this.addPartyCandidate.controls['ElectionDate'].value;

    this.date = new Date(moment(data).format('YYYY-MM-DD'));

    if (this.date < new Date()) {
      swal('Sorry!!!', 'You cannot select back dated Election Date!!!', 'error');
      this.addPartyCandidate.controls['ElectionDate'].setValue('');
    }
  }
}
