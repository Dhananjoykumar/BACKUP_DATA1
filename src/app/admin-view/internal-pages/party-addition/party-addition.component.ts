import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { AddParty } from 'app/admin-view/models/party';
import { PartyServiceService } from 'app/admin-view/shared/party-service.service';

@Component({
  selector: 'app-party-addition',
  templateUrl: './party-addition.component.html',
  styleUrls: ['./party-addition.component.scss']
})
export class PartyAdditionComponent implements OnInit {

  addParty: AddParty[] = new Array<AddParty>();
  partyForm: FormGroup;
  titleAlert = 'This field is required';
  constructor(private _fb: FormBuilder, private _partyService: PartyServiceService) {

  }

  ngOnInit() {
    const partyModel = this._partyService.storageEl;
    if (partyModel) {
      this.initForm(partyModel);
    }else {
      this.initForm({});
    }
  }

  initForm(addParty) {
    this.partyForm = this._fb.group({
      PTID: [addParty.PTID || '', Validators.required],
      PartyName: [addParty.PartyName || '', Validators.required],
      RegistrationDate: [addParty.RegistrationDate || '', Validators.required],
      Symbols: [addParty.Symbols || '', Validators.required],
      ContactPersonName: [addParty.ContactPersonName || '', Validators.required],
      ContactPersonMobile: [addParty.ContactPersonMobile || '', Validators.required],
      HeadAddress: [addParty.HeadAddress || '']
    });
  }

  savePartyData(partyDataModel, isValid) {
    console.log(JSON.stringify(this.partyForm.value));
    this.partyForm.reset();
  }

}
