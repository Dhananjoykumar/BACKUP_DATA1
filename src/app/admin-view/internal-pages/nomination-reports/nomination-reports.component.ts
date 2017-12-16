import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalBodyService } from 'app/admin-view/shared/local-body.service';
import { StateList } from 'app/admin-view/models/stateList';
import { DistrictList } from 'app/admin-view/models/districtList';

@Component({
  selector: 'app-nomination-reports',
  templateUrl: './nomination-reports.component.html',
  styleUrls: ['./nomination-reports.component.scss']
})
export class NominationReportsComponent implements OnInit {

  stateList: StateList[] = new Array<StateList>();
  distList: DistrictList[] = new Array<DistrictList>();
  nominationReport: FormGroup;
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
    this.nominationReport = this._fb.group({
      StateId: ['', Validators.required],
      DistId: ['', Validators.required],
      LocalBodyTypeId: ['', Validators.required],
      LocalBodyId: ['', Validators.required],
      ReportType: ['', Validators.required],
      FromDate: [''],
      ToDate: ['']
    });
  }

  onStateChange() {
    let stateData = this.nominationReport.controls['StateId'].value;
    // console.log(stateData);
    this._localBody.getDistrict(+stateData).subscribe(data => {
      this.distList = data;
      console.log(data);
    });
  }
}
