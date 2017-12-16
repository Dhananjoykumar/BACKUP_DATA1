import { Component, OnInit } from '@angular/core';
import { StateList } from 'app/admin-view/models/stateList';
import { DistrictList } from 'app/admin-view/models/districtList';
import { AddOffer } from 'app/admin-view/models/addoffer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalBodyService } from 'app/admin-view/shared/local-body.service';
import { Router } from '@angular/router';
import { AddOffersService } from 'app/admin-view/shared/add-offers.service';
import { LocalBody } from 'app/admin-view/models/localbody';

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.scss']
})
export class AddOffersComponent implements OnInit {

  stateList: StateList[];
  districtList: DistrictList[];
  addOffersObj: AddOffer;
  addOfferArray: AddOffer[] = [];
  localBodyList: LocalBody[] = new Array<LocalBody>();
  titleAlert = 'This field is required';
  addOffersForm: FormGroup;
  constructor(private _fb: FormBuilder, private _localBody: LocalBodyService,
    private router: Router, private _offerService: AddOffersService) {
      this._localBody.getStateList().subscribe(res => {
        this.stateList = res;
      });
    }

  ngOnInit() {
    this.initForm({});
  }

  initForm(addOfferArray) {
    this.addOffersForm = this._fb.group ({
      StateId: ['', Validators.required],
      DistId: ['', Validators.required],
      LocalBodyId: [''],
      LocalBodyTypeId: [''],
      PartyTypeID: ['', Validators.required],
      PartyID: [''],
      OfferNo: ['', Validators.required],
      OfferHeading: ['', Validators.required],
      OfferCode: ['', Validators.required],
      OfferStartDate: ['', Validators.required],
      OfferEndDate: ['', Validators.required]
    });
  }

  uploadOffers(offerData) {
    this.addOffersObj = this.addOffersForm.value;
    console.log(this.addOffersObj);
    this._offerService.addOffers(this.addOffersForm.value);
    this.router.navigateByUrl('/pages/addOfferTable');
  }

  OnStateChange() {
    // get district on change of state id
    const getStateId = <HTMLInputElement>document.getElementById('selectStateId');
    this._localBody.getDistrict(+getStateId.value).subscribe(res => {
      this.districtList = res;
    });
  }

  onLocalBodyTypeChange() {
    const getStateId = <HTMLInputElement>document.getElementById('selectStateId');
    const getDistrictId = <HTMLInputElement>document.getElementById('selectDistrictId');
    const LocalBodyTypeId = <HTMLInputElement>document.getElementById('LocalBodyTypeId');
    console.log('change');
    this._localBody.downloadLocalBody(
      +getStateId.value, +getDistrictId.value, +LocalBodyTypeId.value).subscribe(res => {
        this.localBodyList = res;
        // console.log(res);
      });
  }

}
