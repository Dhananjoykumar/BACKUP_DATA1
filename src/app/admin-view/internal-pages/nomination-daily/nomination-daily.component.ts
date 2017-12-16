import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalBodyService } from 'app/admin-view/shared/local-body.service';
import { StateList } from 'app/admin-view/models/stateList';
import { DistrictList } from 'app/admin-view/models/districtList';
import { LocalBody } from 'app/admin-view/models/localbody';

@Component({
  selector: 'app-nomination-daily',
  templateUrl: './nomination-daily.component.html',
  styleUrls: ['./nomination-daily.component.scss']
})
export class NominationDailyComponent implements OnInit {

  stateList: StateList[] = new Array<StateList>();
  distList: DistrictList[] = new Array<DistrictList>();
  localBodyList: LocalBody[] = new Array<LocalBody>();
  nominationDaily: FormGroup;
  titleAlert = 'This field is required';

  constructor(private _fb: FormBuilder, private _localBody: LocalBodyService) {
    this._localBody.getStateList().subscribe(data => {
      this.stateList = data;
    });
  }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.nominationDaily = this._fb.group({
      StateId: ['', Validators.required],
      DistId: ['', Validators.required],
      LocalBodyType: ['', Validators.required],
      LocalBodyId: ['', Validators.required],
      ReportType: ['', Validators.required],
      MessageType: [''],
      MessageText: ['']
    });
  }

  onStateChange() {
    let stateData = this.nominationDaily.controls['StateId'].value;
    // console.log(stateData);
    this._localBody.getDistrict(+stateData).subscribe(data => {
      this.distList = data;
      console.log(data);
    });
  }

  onLocalBodyTypeChange() {
    const stateId = this.nominationDaily.controls['StateId'].value;
    const distId = this.nominationDaily.controls['DistId'].value;
    const localBodyType = this.nominationDaily.controls['LocalBodyType'].value;
    console.log(stateId);

    this._localBody.downloadLocalBody(+stateId, +distId, +localBodyType).subscribe(data => {
      this.localBodyList = data;
      console.log(data);
    });
  }
}
