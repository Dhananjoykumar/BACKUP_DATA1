import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AddParty } from 'app/admin-view/models/party';
import { PartyServiceService } from 'app/admin-view/shared/party-service.service';
import { LocalBodyService } from 'app/admin-view/shared/local-body.service';
import { StateList } from 'app/admin-view/models/stateList';
import * as swal from 'sweetalert';

@Component({
  selector: 'app-party-addition',
  templateUrl: './party-addition.component.html',
  styleUrls: ['./party-addition.component.scss']
})
export class PartyAdditionComponent implements OnInit {
  isEdit: boolean ;
  addParty: AddParty[] = new Array<AddParty>();
  addPartyObj: AddParty;
  stateList: StateList[];
  partyForm: FormGroup;
  titleAlert = 'This field is required';
  constructor(
    private _fb: FormBuilder, private router: Router,
     private _partyService: PartyServiceService,
       private _localBodyService: LocalBodyService
    ) {
      this._localBodyService.getStateList().subscribe(res => {
        this.stateList = res;
      });
    }

  ngOnInit() {
    this.isEdit = true;
    const partyModel = this._partyService.storageEl;
    if (partyModel) {
      this.isEdit = false;
      this.initForm(partyModel);
    }else {
      this.initForm({});
    }
  }

  initForm(addParty) {
    this.partyForm = this._fb.group({
      PID: [addParty.PID || ''],
      PTID: [addParty.PTID || '', Validators.required],
      PartyName: [addParty.PartyName || '', Validators.required],
      RegistrationDate: [addParty.RegistrationDate || '', Validators.required],
      Symbols: [addParty.Symbols || '', Validators.required],
      ContactPersonName: [addParty.ContactPersonName || '', Validators.required],
      ContactPersonMobile: [addParty.ContactPersonMobile || '', Validators.required],
      HeadAddress: [addParty.HeadAddress || ''],
      City: [addParty.City || ''],
      StateId: [addParty.StateId || ''],
      PinCode: [addParty.PinCode || '']
    });
  }

  savePartyData(partyDataModel, isValid) {
    this.addPartyObj = this.partyForm.value;
    this.addPartyObj.MobileNo = '9422325020';
    this.addPartyObj.TokenId = '15BB8580-1C3D-467D-9E82-450C37E8D6FF';
    console.log(this.addPartyObj);
    this.partyForm.reset();
  }

  downloadData() {
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onMobileNoEntered() {
    this.addPartyObj = this.partyForm.value;
    this.addPartyObj.MobileNo = '7741909862';
    this.addPartyObj.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
    this._partyService.checkMobileNo(this.addPartyObj).subscribe(res => {
      this.addParty = res;
      // console.log(this.addParty);

      if (this.addParty[0].Status == '108') {
        swal('Sorry', 'Mobile Number Already Exits!', 'error');
        this.partyForm.controls['ContactPersonMobile'].setValue('');
      }else {
        swal('Okay', 'Mobile Verification Success!', 'success');
        console.log(this.addPartyObj);
      }
    });
  }

  onCancel() {
    this.router.navigateByUrl('/pages/party-table');
  }
}
