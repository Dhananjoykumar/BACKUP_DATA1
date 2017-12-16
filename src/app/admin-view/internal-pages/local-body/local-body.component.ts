import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import * as swal from 'sweetalert';
import { Router } from '@angular/router';
import { LocalBodyService } from 'app/admin-view/shared/local-body.service';
import { StateList } from 'app/admin-view/models/stateList';
import { DistrictList } from 'app/admin-view/models/districtList';
import { LocalBody } from 'app/admin-view/models/localbody';
import { TalukaList } from 'app/admin-view/models/talukaList';
import { AssemblyList } from 'app/admin-view/models/assemblyList';
@Component({
  selector: 'app-local-body',
  templateUrl: './local-body.component.html',
  styleUrls: ['./local-body.component.scss']
})
export class LocalBodyComponent implements OnInit {
  isEdit: boolean;
  status: boolean;
  stateList: StateList[];
  districtList: DistrictList[];
  dataLocal: LocalBody[] = new Array<LocalBody>();
  talukaData: LocalBody[] = new Array<LocalBody>();
  tArray: TalukaList[] = new Array<TalukaList>();
  tData = new TalukaList;
  assemblyData = new AssemblyList;
  assemblyListArray: AssemblyList[] = new Array<AssemblyList>();
  data: number[] = new Array<number>();
  tempdata: number[] = [];
  finaldata: number[] = [];
  isChecked: boolean;

  statusData: BooleanStatus[] = [];

  localBodyData = new LocalBody;
  titleAlert = 'This field is required';

  localbodyForm: FormGroup;
  constructor(private _localBody: LocalBodyService,
    private _fb: FormBuilder, private router: Router) {
    // binding state list to dropdown
    this._localBody.getStateList().subscribe(res => {
      this.stateList = res;
    });

    this.status = false;
    this.tempdata = [];
  }

  ngOnInit() {
    this.isEdit = false;

    // showing and hiding textbox and label on select of grampanchayat
    const divsionDataLabel = <HTMLInputElement>document.getElementById('gramDivLabel');
    const divsionDataText = <HTMLInputElement>document.getElementById('gramDivText');
    divsionDataLabel.hidden = true;
    divsionDataText.hidden = true;

    // getting data on edit button click
    const localBodyModel = this._localBody.storageEl;
    const assemblyList = this._localBody.assemblyList;
    if (localBodyModel) {
      this.isEdit = true;
      this.initForm(localBodyModel);
      this.onEditDistrictChange(localBodyModel.StateId);
      this.onEditAssemblyChange(localBodyModel.DistId);
      this.onEditAssemblyId(localBodyModel.LocalBodyId);
      // console.log('data1', assemblyList);
    } else {
      // adding data on submit button click
      this.isEdit = false;
      this.initForm({});
    }
  }


  initForm(dataLocal) {
    this.localbodyForm = this._fb.group({
      Id: [dataLocal.Id || ''],
      StateId: [dataLocal.StateId || '', Validators.required],
      DistId: [dataLocal.DistId || '', Validators.required],
      LocalBodyId: [dataLocal.LocalBodyId || '', Validators.required],
      LocalBodyName: [dataLocal.LocalBodyName || '', Validators.required],
      LocalBodyTypeId: [dataLocal.LocalBodyTypeId || '', Validators.required],
      DivisionId: [dataLocal.DivisionId || ''],
      AssemblyId: [dataLocal.AssemblyId || '']
    });
  }

  divisionChange() {
    const divsionDataLabel = <HTMLInputElement>document.getElementById('gramDivLabel');
    const selectdivision = <HTMLInputElement>document.getElementById('selectLocalBody');
    const divsionDataText = <HTMLInputElement>document.getElementById('gramDivText');
    if (selectdivision.value === '6') {
      divsionDataLabel.hidden = false;
      divsionDataText.hidden = false;
    } else {
      divsionDataLabel.hidden = true;
      divsionDataText.hidden = true;
    }
  }

  OnStateChange() {
    // get district on change of state id
    const getStateId = <HTMLInputElement>document.getElementById('selectStateId');
    this._localBody.getDistrict(+getStateId.value).subscribe(res => {
      this.districtList = res;
    });
  }
  onDistrictChange() {
    // get taluka on change of district id
    const getDistrictId = <HTMLInputElement>document.getElementById('selectDistrictId');
    // console.log(getDistrictId.value);
    this._localBody.getAssembly(+getDistrictId.value).subscribe(res => {
      this.talukaData = res;
    });
  }

  onEditDistrictChange(distId) {
    this._localBody.getDistrict(distId).subscribe(res => {
      this.districtList = res;
    });
  }

  onEditAssemblyChange(distId) {
    // console.log('editData', this.tempdata[0]);
    // let checkedData = <HTMLInputElement>document.getElementById('talukaList');
    this._localBody.getAssembly(distId).subscribe(res => {
      this.talukaData = res;
      // console.log(this.tempdata.length);
      for (let i = 0; i < this.tempdata.length; i++) {
        for (let j = 0; j < this.talukaData.length; j++) {
          if (this.tempdata[i] == +this.talukaData[j].AssemblyId) {
            // console.log('a', this.tempdata[i]);
            // console.log('b', this.talukaData[j].AssemblyId);
            //  checkedData.checked = true;
            // this.isChecked = true;
            this.talukaData[j].lbStatus = true;
          }
        }
      }

    });
  }

  onEditAssemblyId(localId) {
    this._localBody.downloadAssemblyId(localId).subscribe(res => {
      this.assemblyListArray = res;
      for (let i = 0; i < this.assemblyListArray.length; i++) {
        this.tempdata.push(this.assemblyListArray[i].AssemblyId);
      }
      // console.log(this.assemblyListArray);
    });
    // console.log('tmpdata', this.tempdata);
  }


  saveLocalBody(localBodyModel, isValid) {
    if (isValid) {
      // form data push to localbody array
      this.localBodyData = this.localbodyForm.value;
      this.localBodyData.MobileNo = '9422325020';
      this.localBodyData.TokenId = '15BB8580-1C3D-467D-9E82-450C37E8D6FF';
      // this.localBodyData.Id = '0';
      if (this.localBodyData.Id == '' || this.localBodyData.Id == null) {
        this.localBodyData.Id = '0';
        this._localBody.addLocalBody(this.localBodyData).subscribe(res => {
          this.dataLocal = res;
          // console.log(this.dataLocal);
          if (this.dataLocal[0].Status == '106') {
            for (let i = 0; i < this.data.length; i++) {
              this.assemblyData.AssemblyId = this.data[i];
              this.assemblyData.LocalBodyId = this.dataLocal[0].LocalBodyId;
              this.assemblyData.MobileNo = '9422325020';
              this.assemblyData.TokenId = '15BB8580-1C3D-467D-9E82-450C37E8D6FF';
              this.assemblyListArray.push(Object.assign({}, this.assemblyData));
            }

            this._localBody.addAssemblyList(this.assemblyListArray).subscribe(res => {
              this.assemblyListArray = res;
              if (this.assemblyListArray[0].Status === '106') {
                swal({
                  title: 'Data Inserted ',
                  text: 'OK',
                  icon: 'success',

                }).then((value) => {
                  if (value) {
                    this.router.navigateByUrl('/pages/local-body-table');
                  }
                });
              } else {
                swal('Sorry!', 'Data Insertion Failed!', 'error');
              }
            });
          } else if (this.dataLocal[0].Status == '108') {
            swal('Sorry!', 'Local Body Id Exist', 'error');
          }
        });
      } else {
        // console.log('asseblyData 1', this.assemblyData);
        this._localBody.addLocalBody(this.localBodyData).subscribe(res => {
          this.dataLocal = res;
          // console.log(this.dataLocal[0].Status);
          this.assemblyListArray = [];
          // console.log('assembly', this.assemblyListArray);
          if (this.dataLocal[0].Status == '106') {
            for (let i = 0; i < this.tempdata.length; i++) {
              this.assemblyData.AssemblyId = this.tempdata[i];
              this.assemblyData.LocalBodyId = this.dataLocal[0].LocalBodyId;
              this.assemblyData.MobileNo = '9422325020';
              this.assemblyData.TokenId = '15BB8580-1C3D-467D-9E82-450C37E8D6FF';

              this.assemblyListArray.push(Object.assign({}, this.assemblyData));
            }

            this._localBody.addAssemblyList(this.assemblyListArray).subscribe(res => {
              this.assemblyListArray = res;

              if (this.assemblyListArray[0].Status == '106') {
                swal({
                  title: 'Data Updated ',
                  text: 'OK',
                  icon: 'success',

                }).then((value) => {
                  if (value) {
                    this.router.navigateByUrl('/pages/local-body-table');
                  }
                });
              } else {
                swal('Sorry!', 'Data Updation Failed!', 'error');
              }
            });
          }
        });
      }

    } else {
      swal('Sorry!', 'Data Validation Failed!', 'error');
    }

  }

  assemblylistArray(e, event) {
    let updateBtn = <HTMLInputElement>document.getElementById('btnUpdate');
    // updateBtn.disabled = true;
    this.localBodyData = this.localbodyForm.value;
    // console.log('lb', this.localbodyForm.value);
    if (this.localBodyData.Id == '' || this.localBodyData.Id == null) {
      if (event.target.checked) {
        this.data.push(e);
        // this.tempdata.push(e);
        // console.log(this.data);
        // console.log(this.tempdata);
      } else if (!event.target.checked) {
        const dataIndex = this.data.indexOf(e);
        this.data.splice(dataIndex, 1);
        // console.log(this.data);
  
      }
    } else {
      // console.log(this.tempdata);
      if (event.target.checked) {
        this.tempdata.push(e);
         updateBtn.disabled = false;
        // this.tempdata.push(e);
        // console.log(this.tempdata);
        // console.log(this.tempdata);
      } else if (!event.target.checked) {
        const dataIndex = this.tempdata.indexOf(e);
        this.tempdata.splice(dataIndex, 1);
        // console.log(this.tempdata);
        if (this.tempdata.length == 0 || this.tempdata == null) {
          updateBtn.disabled = true;
        }
      }
    }
  }

  onCancel() {
    this.router.navigateByUrl('/pages/local-body-table');
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}


interface BooleanStatus {
  data: number;
  checkedStatus: boolean;
}
