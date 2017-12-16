import { Component, OnInit } from '@angular/core';
import { PartyRepresentative } from 'app/admin-view/models/partyRepresentative';
import { PartyServiceService } from 'app/admin-view/shared/party-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-party-representative-table',
  templateUrl: './party-representative-table.component.html',
  styleUrls: ['./party-representative-table.component.scss']
})
export class PartyRepresentativeTableComponent implements OnInit {

  // isActive: boolean;

  partyRepArray: PartyRepresentative[] = [];
  constructor(private _partyService: PartyServiceService, private router: Router) {
    this.partyRepArray = this._partyService.partyRep;
    console.log(this.partyRepArray);
  }

  ngOnInit() {
  }

  editPartyRepData(mobile: string) {
    console.log(mobile);
    const result = this.partyRepArray.filter(function (tmpRepData){
      return tmpRepData.RepMobileNo == mobile;
      
    });
    console.log(result);
    this._partyService.storageEl = result[0];
    this.router.navigate(['/pages/party-representative']);
  }

  isActive(mobile: string) {
    console.log(mobile);
    for ( let i = 0; i < this.partyRepArray.length; i++) {
      if (mobile === this.partyRepArray[i].RepMobileNo) {
        if (this.partyRepArray[i].IsActive === '0' ) {
          this.partyRepArray[i].IsActive = '1';
        }else {
          this.partyRepArray[i].IsActive = '0';
        }
      }else {
        continue;
      }
    }
  }
  addNewPartyRep() {
    this.router.navigateByUrl('/pages/party-representative');
  }
}
