import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateList } from 'app/admin-view/models/stateList';
import { LocalBodyService } from 'app/admin-view/shared/local-body.service';
import { DistrictList } from 'app/admin-view/models/districtList';
import { LocalBody } from 'app/admin-view/models/localbody';

@Component({
  selector: 'app-dynamic-messaging',
  templateUrl: './dynamic-messaging.component.html',
  styleUrls: ['./dynamic-messaging.component.scss']
})
export class DynamicMessagingComponent implements OnInit {

  stateList: StateList[] = new Array<StateList>();
  distList: DistrictList[] = new Array<DistrictList>();
  localBodyList: LocalBody[] = new Array<LocalBody>();
  dynamicMessaging: FormGroup;
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
    this.dynamicMessaging = this._fb.group({
      StateId: ['', Validators.required],
      DistId: ['', Validators.required],
      LocalBodyType: ['', Validators.required],
      LocalBodyId: ['', Validators.required],
      FormType: ['', Validators.required],
      ID: [''],
      Message: [''],
      MobileNo: ['']
    });
  }

  onStateChange() {
    let stateData = this.dynamicMessaging.controls['StateId'].value;
    // console.log(stateData);
    this._localBody.getDistrict(+stateData).subscribe(data => {
      this.distList = data;
      console.log(data);
    });
  }

  onLocalBodyTypeChange() {
    const stateId = this.dynamicMessaging.controls['StateId'].value;
    const distId = this.dynamicMessaging.controls['DistId'].value;
    const localBodyType = this.dynamicMessaging.controls['LocalBodyType'].value;
    console.log(stateId);

    this._localBody.downloadLocalBody(+stateId, +distId, +localBodyType).subscribe(data => {
      this.localBodyList = data;
      console.log(data);
    });
  }

  searchReportData(reportData) {
    console.log(reportData);
  }

  sendMessage() {
    
  }
}
