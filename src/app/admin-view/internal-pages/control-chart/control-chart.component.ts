import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as swal from 'sweetalert';
import { FormGroup, FormControl } from '@angular/forms';
import { ControlChartService } from 'app/admin-view/shared/controlChart.service';
import { ControlChart } from 'app/admin-view/models/controlChart';

@Component({
  selector: 'app-control-chart',
  templateUrl: './control-chart.component.html',
  styleUrls: ['./control-chart.component.css']
})
export class ControlChartComponent implements OnInit {
  zoom: number = 8;
  public loading = false;
  isChecked: boolean = true;
  editMode: boolean = true;
  split: boolean = true;
  data: string;
  public controlChart = new ControlChart;
  public chartsdata: ControlChart[];
  markerName: string;
  Latitude: string;
  Longitude: string;
  markerDraggable: string;
  markers: ControlChart[] = [];
  count: number;
  controlChartForm: FormGroup;
  ngOnInit(): any {

  }

  constructor(private services: ControlChartService, private route: Router) {
    this.controlChartForm = new FormGroup({
      propertyDetailsOf: new FormControl(),
      ACNO: new FormControl(),
      PartNo: new FormControl(),
      WardNo: new FormControl(),
      Id: new FormControl(),
      FromUser: new FormControl(),
      ToUser: new FormControl(),
      FromDate: new FormControl(),
      ToDate: new FormControl(),
      SplitFrom: new FormControl(),
      SplitTo: new FormControl(),
      BoothNo: new FormControl(),
      CreateDate: new FormControl(),
      CreatedBy: new FormControl(),
      Latitude: new FormControl(),
      Longitude: new FormControl(),
      SectionNo: new FormControl(),
      SrNoTo: new FormControl(),
      SrNoFrom: new FormControl(),
      Status: new FormControl(),
      UpdatedBy: new FormControl(),
      Voters: new FormControl(),
      vstatus: new FormControl(),
    });
  };

 


  check(id: number) {
    this.isChecked = false;
    this.count = 0;
    for (let i = 0; i < this.chartsdata.length; i++) {
      if (id == parseInt(this.chartsdata[i].Id)) {
        this.markers.push(this.chartsdata[i]);
        this.Latitude = this.markers[0].Latitude;
        this.Longitude = this.markers[0].Longitude;
      } else {
        this.markers.pop();
      }
    }
  }

  isSplit(i) {
    this.split = false;
    this.controlChartForm.get('Id').setValue(this.chartsdata[i].Id);
  }
  isEdit(i) {
    this.editMode = false;
    this.controlChartForm.get('Id').setValue(this.chartsdata[i].Id);
    this.controlChartForm.get('ACNO').setValue(this.chartsdata[i].ACNO);
    this.controlChartForm.get('PartNo').setValue(this.chartsdata[i].PartNo);
    this.controlChartForm.get('WardNo').setValue(this.chartsdata[i].WardNo);
    this.controlChartForm.get('CreateDate').setValue(this.chartsdata[i].CreateDate);
    this.controlChartForm.get('CreatedBy').setValue(this.chartsdata[i].CreatedBy);
    this.controlChartForm.get('Latitude').setValue(this.chartsdata[i].Latitude);
    this.controlChartForm.get('Longitude').setValue(this.chartsdata[i].Longitude);
    this.controlChartForm.get('BoothNo').setValue(this.chartsdata[i].BoothNo);
    this.controlChartForm.get('SectionNo').setValue(this.chartsdata[i].SectionNo);
    this.controlChartForm.get('SrNoFrom').setValue(this.chartsdata[i].SrNoFrom);
    this.controlChartForm.get('SrNoTo').setValue(this.chartsdata[i].SrNoTo);
    this.controlChartForm.get('FromUser').setValue(this.chartsdata[i].FromUser);
    this.controlChartForm.get('ToUser').setValue(this.chartsdata[i].ToUser);
    this.controlChartForm.get('SplitFrom').setValue(this.chartsdata[i].SplitFrom);
    this.controlChartForm.get('SplitTo').setValue(this.chartsdata[i].SplitTo);
    this.controlChartForm.get('Status').setValue(this.chartsdata[i].Status);
    this.controlChartForm.get('UpdatedBy').setValue(this.chartsdata[i].UpdatedBy);
    this.controlChartForm.get('Voters').setValue(this.chartsdata[i].Voters);
    this.controlChartForm.get('vstatus').setValue(this.chartsdata[i].vstatus);
  }

  updateControlChart() {
    this.controlChart = this.controlChartForm.value;
    this.controlChart.MobileNo = '9422325020';
    this.controlChart.TokenId = '15BB8580-1C3D-467D-9E82-450C37E8D6FF';
    this.services.updateData(this.controlChart).subscribe(data => {
      this.route.navigate(['/internalpages/controlChart']);

    });
    swal('Okay!!!', 'Data update successfully...', 'success');
    this.editMode = true;
    window.location.reload();
  }
  splitData() {
    let IdData = <HTMLInputElement>document.getElementById('Id');
    let SplitFromData = <HTMLInputElement>document.getElementById('SplitFrom');
    let SplitToData = <HTMLInputElement>document.getElementById('SplitTo');
    this.services.getSplitData(IdData.value, SplitFromData.value, SplitToData.value).subscribe(data => {
      this.searchChartControl();
      swal('Okay!!!', 'Data split successfully...', 'success');
    });
    this.split = true;
    this.controlChartForm.reset();
  }
  searchChartControl() {
    console.log('Search Chart Control');
      let ACNOData = <HTMLInputElement>document.getElementById('ACNO');
      let PartNoData = <HTMLInputElement>document.getElementById('PartNo');
      let WardNoData = <HTMLInputElement>document.getElementById('WardNo');
      let IdData = <HTMLInputElement>document.getElementById('Id');
      let FromUserData = <HTMLInputElement>document.getElementById('FromUser');
      let ToUserData = <HTMLInputElement>document.getElementById('ToUser');
      let FromDateData = <HTMLInputElement>document.getElementById('FromDate');
      let ToDateData = <HTMLInputElement>document.getElementById('ToDate');
      //
      if (ACNOData.value == '' && PartNoData.value == '' && WardNoData.value == '' && IdData.value == '' && FromUserData.value == '' && ToUserData.value == '' && FromDateData.value == '' && ToUserData.value == '') {
        swal('Sorry!!!', 'Please do fill all fields to search...', 'warning');
      } else if (PartNoData.value != '' && ACNOData.value == '')
      {
        swal('Sorry!!!', 'Please do fill ACNOData to search...', 'warning');
      } else if (PartNoData.value != '' && WardNoData.value != '' && ACNOData.value == '')
      {
        swal('Sorry!!!', 'Please do fill ACNOData to search...', 'warning');
      } else if (WardNoData.value != '' && ACNOData.value != '' && PartNoData.value == '')
      {
        swal('Sorry!!!', 'Please do fill PartNoData to search...', 'warning');
      }
      else if (WardNoData.value != '' && ACNOData.value == '' && PartNoData.value === '')
      {
        swal('Sorry!!!', 'Please do fill ACNOData & PartNoData to search...', 'warning');
      } else {
        this.services.getControlChartDetails(ACNOData.value,PartNoData.value,WardNoData.value,IdData.value,FromUserData.value,ToUserData.value,FromDateData.value,ToDateData.value)
        .subscribe(data => {
                      this.chartsdata = data;
                      if(this.chartsdata[0].Status == '107')
                      {
                        swal('Sorry!!!', 'Data not found...', 'error');
                        data = '';
                        this.chartsdata = data;
                      }else {
                        swal('Okay!!!', 'Data fetch Successfully...', 'success');
                      }
                    });
      }
      this.controlChartForm.reset();
    }
  }

