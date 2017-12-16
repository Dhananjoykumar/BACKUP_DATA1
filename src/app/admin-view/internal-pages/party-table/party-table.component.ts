import { Component, OnInit } from '@angular/core';
import { PartyServiceService } from 'app/admin-view/shared/party-service.service';
import { Router } from '@angular/router';
import { AddParty } from 'app/admin-view/models/party';

@Component({
  selector: 'app-party-table',
  templateUrl: './party-table.component.html',
  styleUrls: ['./party-table.component.scss']
})
export class PartyTableComponent implements OnInit {

  PartyArrayData: AddParty[] = [];
  constructor(private _partyService: PartyServiceService, private router: Router) {
    this.PartyArrayData = this._partyService.getPartydata();
    console.log(this.PartyArrayData);
  }

  ngOnInit() {
  }

  editPartyData(id: string) {
    const result = this.PartyArrayData.filter(function(partyData){
      return partyData.ContactPersonMobile == id;
    });
    this._partyService.storageEl = result[0];
    this.router.navigate(['/pages/party-addition']);
  }

}
