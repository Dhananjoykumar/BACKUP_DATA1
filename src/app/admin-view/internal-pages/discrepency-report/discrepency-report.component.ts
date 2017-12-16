import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalBodyService } from 'app/admin-view/shared/local-body.service';
import { StateList } from 'app/admin-view/models/stateList';
import { DistrictList } from 'app/admin-view/models/districtList';
import { LocalBody } from 'app/admin-view/models/localbody';
import { ReportsService } from 'app/admin-view/shared/reports.service';

@Component({
  selector: 'app-discrepency-report',
  templateUrl: './discrepency-report.component.html',
  styleUrls: ['./discrepency-report.component.scss']
})
export class DiscrepencyReportComponent implements OnInit {

  stateList: StateList[] = new Array<StateList>();
  distList: DistrictList[] = new Array<DistrictList>();
  localBodyList: LocalBody[] = new Array<LocalBody>();
  discripencyReport: FormGroup;

  constructor(private _fb: FormBuilder, private _localBody: LocalBodyService,
              private _reportService: ReportsService) {
    this._localBody.getStateList().subscribe(data => {
      this.stateList = data;
    });
  }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.discripencyReport = this._fb.group({
      StateId: [''],
      DistId: [''],
      LocalBodyType: [''],
      LocalBodyId: [''],
      WardNo: ['']
    });
  }

  onStateChange() {
    const stateId = this.discripencyReport.controls['StateId'].value;
    this._localBody.getDistrict(+stateId).subscribe(data => {
      this.distList = data;
    });
  }

  onLocalBodyTypeChange() {
    const stateId = this.discripencyReport.controls['StateId'].value;
    const distId = this.discripencyReport.controls['DistId'].value;
    const localBodyType = this.discripencyReport.controls['LocalBodyType'].value;

    this._localBody.downloadLocalBody(+stateId, +distId, +localBodyType).subscribe(data => {
      this.localBodyList = data;
    });
  }

  searchDiscripencyReport() {
    this._reportService.getDiscripency(this.discripencyReport.value);
  }

  showData(myModal) {
    myModal.show();
  }

}
