import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalBodyService } from 'app/admin-view/shared/local-body.service';
import { LocalBody } from 'app/admin-view/models/localbody';
declare const $;
@Component({
  selector: 'app-lolocal-body-table',
  templateUrl: './lolocal-body-table.component.html',
  styleUrls: ['./lolocal-body-table.component.scss']
})
export class LolocalBodyTableComponent implements OnInit {
  public loading = false;
  togglediv: boolean;
  localBodyList: LocalBody[];
  templocal: LocalBody;
  assemblyListArray: LocalBody[] = [];
  collapsed1: boolean;

  constructor(private _localbodyService: LocalBodyService, private router: Router) {
    this.loading = true;
    this._localbodyService.getLocalBodyData().subscribe(res => {
      this.loading = false;
       this.localBodyList = res;
      //  console.log(this.localBodyList);
    });
  }

  ngOnInit() {
   this.collapsed1 = true;
  }

  editLocalBodyData(myModal, id: string) {

    const result = this.localBodyList.filter(function(localBody) {
      return localBody.Id == id;
    });

    // this.templocal = result[0];
    // this._localbodyService.downloadAssemblyId(+this.templocal.LocalBodyId).subscribe(res => {
    //   this.assemblyListArray = res;
    //   console.log('data1', this.assemblyListArray);
    // });
    // console.log('data2', this.assemblyListArray);
    // const result1 = this.assemblyListArray.filter(function(assembly) {
    //   return assembly.LocalBodyId == lbid;
    // });


    this._localbodyService.storageEl = result[0];
    // this._localbodyService.assemblyList = result1[0];
    this.router.navigate(['/pages/local-body']);
  }

  // showMore() {
  //   if (this.togglediv == false) {
  //     this.togglediv = true;
  //   }else {
  //     this.togglediv = false;
  //   }
  // }

}
