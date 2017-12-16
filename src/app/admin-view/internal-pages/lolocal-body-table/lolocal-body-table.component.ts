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
  localBodyList: LocalBody[];

  constructor(private _localbodyService: LocalBodyService, private router: Router) {
    this.loading = true;
    this._localbodyService.getLocalBodyData().subscribe(res => {
      this.loading = false;
       this.localBodyList = res;
    });
  }

  ngOnInit() {

  }

  editLocalBodyData(myModal, id: string) {
    const result = this.localBodyList.filter(function(localBody) {
      return localBody.LocalBodyId === id;
    });
    this._localbodyService.storageEl = result[0];
    this.router.navigate(['/pages/local-body']);
  }

}
