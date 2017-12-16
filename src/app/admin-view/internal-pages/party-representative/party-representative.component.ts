import { Component, OnInit } from '@angular/core';
import { PartyRepresentative } from 'app/admin-view/models/partyRepresentative';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartyServiceService } from 'app/admin-view/shared/party-service.service';
import * as swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-party-representative',
  templateUrl: './party-representative.component.html',
  styleUrls: ['./party-representative.component.scss']
})
export class PartyRepresentativeComponent implements OnInit {

  addReprsentative: PartyRepresentative[] = new Array<PartyRepresentative>();
  partyRepForm: FormGroup;
  tmpArray: PartyRepresentative;
  isEdit: boolean;
  titleAlert = 'This field is required';
  constructor(private _fb: FormBuilder, private router: Router,
     private _partyService: PartyServiceService) { }

  ngOnInit() {
    this.isEdit = true;
    const partyRepModel = this._partyService.storageEl;
    if (partyRepModel) {
      this.isEdit = false;
      this.initForm(partyRepModel);
    }else {
      this.initForm({});
    }
  }

  initForm(addRepresentative) {
    this.partyRepForm = this._fb.group({
      RepMobileNo: [addRepresentative.RepMobileNo || '', Validators.required],
      Rep_Name: [addRepresentative.Rep_Name || '', Validators.required],
      PartyId: [addRepresentative.PartyId || ''],
      RoleId: [addRepresentative.RoleId || '', Validators.required],
      DistrictId: [addRepresentative.DistrictId || ''],
      LocalBodyId: [addRepresentative.LocalBodyId || ''],
      IsActive: [addRepresentative.IsActive || '', Validators.required],
      PartyName: [addRepresentative.PartyName || '']
    });
  }

  savePartyRepresentative(partyRepModal) {
    this.tmpArray = this.partyRepForm.value;
    this.tmpArray.MobileNo = '9422325020';
    this.tmpArray.TokenId = '15BB8580-1C3D-467D-9E82-450C37E8D6FF';
    console.log(this.tmpArray);
    this.partyRepForm.reset();
  }

  onMobileNoEntered() {
    //  let mob1 = <HTMLInputElement>document.getElementById('RepMobileNo');
    //  console.log(mob1.value);
    const mob = this.partyRepForm.controls['RepMobileNo'].value;
    this.tmpArray = this._partyService.getpartyRep(mob);
    if (this.tmpArray != null) {
      if (mob == this.tmpArray.RepMobileNo) {
        swal('Ok', 'Mobile No Found!', 'success');
        this.partyRepForm.controls['DistrictId'].setValue(this.tmpArray.DistrictId);
        this.partyRepForm.controls['LocalBodyId'].setValue(this.tmpArray.LocalBodyId);
        this.partyRepForm.controls['PartyId'].setValue(this.tmpArray.PartyId);
        this.partyRepForm.controls['PartyName'].setValue(this.tmpArray.PartyName);
      }
    }else {
      swal('Sorry!', 'Mobile no not exist', 'error');
      this.partyRepForm.controls['RepMobileNo'].setValue('');
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onCancel() {
    this.router.navigateByUrl('/pages/party-representative-table');
  }
}
