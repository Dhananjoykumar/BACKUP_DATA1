import { Component, OnInit } from '@angular/core';
import { StateList } from 'app/admin-view/models/stateList';
import { DistrictList } from 'app/admin-view/models/districtList';
import { LocalBody } from 'app/admin-view/models/localbody';
import { LocalBodyService } from 'app/admin-view/shared/local-body.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-report-count',
  templateUrl: './details-report-count.component.html',
  styleUrls: ['./details-report-count.component.scss']
})
export class DetailsReportCountComponent implements OnInit {

  stateList: StateList[];
  districtList: DistrictList[];
  dataLocalArray: LocalBody[] = new Array<LocalBody>();

  localBodyList: LocalBody[] = new Array<LocalBody>();

  detailsReportFrm: FormGroup;
  constructor(private _localBody: LocalBodyService,
    private _fb: FormBuilder, private router: Router) {
    this._localBody.getStateList().subscribe(res => {
      this.stateList = res;
    });
  }

  ngOnInit() {
    this.initForm({});
  }

  initForm(ReportCount) {
    this.detailsReportFrm = this._fb.group({
      StateId: [''],
      DistId: [''],
      LocalBodyId: [''],
      LocalBodyTypeId: [''],
      ReportId: ['']
    });
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
        console.log(res);
      });
  }

  onSearch() {
    console.log('click');
  }

}
