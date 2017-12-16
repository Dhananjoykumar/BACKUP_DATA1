import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from 'app/admin-view/shared/expense.service';
import { Marks } from 'app/admin-view/models/marks';
import { Chart } from 'chart.js';
import { ChartData } from 'app/admin-view/models/ChartData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tempMarks: Marks[] = new Array<Marks>();
  marks: Marks[] = new Array<Marks>();
  mark: Marks = new Marks;
  totalMarks: Marks[] = new Array<Marks>();
  totalMark: Marks = new Marks;
  public barChartOptions: any;
  public barChartLabels: string[];
  public barChartType;
  public barChartLegend;
  public barChartData: any[] = [];
  labelData: string[];
  Label: string;
  public isDataAvailable = false;
  private currentNode;
  private allTheData;
  private Tmp;
  public globalArray: any[] = [];
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType;
  freeApi: ChartData[] = [];
  tmpChartData: ChartData;
  d: number[];

  constructor(private _expService: ExpenseService) {

    this._expService.getStudentTotalMarks().subscribe(data => {
      this.totalMarks = data;
      console.log(data);
      if (data != null) {
        this.isDataAvailable = true;
        this.showData(this.totalMarks);
        this.globalArray.push(this.totalMarks);
      }
    });
    this._expService.getDataFreeApi().subscribe(res => {
      this.freeApi = res;
      console.log(this.freeApi);
      // this.showData(this.freeApi);
    });
  }

  ngOnInit() {
  }

  public showData(Data: Array<Marks>) {
    this.barChartLabels = [];
    for (let i = 0; i < Data.length; i++) {
      this.barChartLabels[i] = Data[i].tmid;
      this.Tmp = this.barChartLabels[i];
    }
    console.log(this.Tmp);
    this.allTheData = {
      drilldown: {
        label: {},
        2: {},
        3: {}
      }
    }
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0, } }]
      }
    };

    console.log(Data[0].tmid);
    console.log('labels', this.barChartLabels);
    this.barChartType = 'bar';
    this.barChartLegend = true;

    // console.log(Data.length);
    if (Data[0].tmid != null) {
      this.barChartLabels = [];
      for (let i = 0; i < Data.length; i++) {
          this.barChartLabels[i] = Data[i].tmid;
        this.mark = Data[i];
        this.barChartData[i] = { data: [this.mark.total_marks1, this.mark.total_marks2, this.mark.total_marks3], 
          label: this.mark.tmid };
        console.log(JSON.stringify(this.barChartData));
      }
    } else {
      this.barChartLabels = [];
      for (let i = 0; i < Data.length; i++) {
        this.barChartLabels[i] = Data[i].sid;
        this.mark = Data[i];
        this.barChartData[i] = {
          data: [this.mark.subject1, this.mark.subject2, this.mark.subject3, this.mark.subject4], 
          label: this.mark.sid };
        console.log(JSON.stringify(this.barChartData));
      }
    }
  }



  public chartClicked(e: any) {
    if (e.active.length === 0) { // do nothing, this is not a meaningful click
      return;
    }
    let label = e.active[0]._model.label;
    console.log('d1', label);
    console.log('global', this.globalArray);
    let arr = this.globalArray;
    this.allTheData = {
      drilldown: {
        1: {}
      }
    };
    this.Label = label;
    this.currentNode = this.currentNode || this.allTheData;
    console.log('d2', this.currentNode);
    this.currentNode = this.currentNode.drilldown[label];
    this.barChartLabels = this.currentNode.labels;
  console.log('d4', this.currentNode);
    this._expService.getStudentMarks(label).subscribe(data => {
      this.marks = data;
      console.log('d3', data);
      if (this.marks != null) {
      }
      this.showData(data);
    });
  }

}
