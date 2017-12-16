import { Component, OnInit } from '@angular/core';
import { PartyCandidateList } from 'app/admin-view/models/partyCandidateList';
import { PartyServiceService } from 'app/admin-view/shared/party-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-party-candidate-table',
  templateUrl: './party-candidate-table.component.html',
  styleUrls: ['./party-candidate-table.component.scss']
})
export class PartyCandidateTableComponent implements OnInit {

  candidateList: PartyCandidateList[] = new Array<PartyCandidateList>();

  constructor(private _partyService: PartyServiceService, private router: Router) {
    this.candidateList = this._partyService.candidateParty;
  }

  ngOnInit() {
  }

  editCandidate(candidateId) {
    this._partyService.storageEl = this._partyService.editCandidateData(candidateId);
    this.router.navigateByUrl('/pages/addpartycandidate');
  }

  activateFund(candidateId) {
    var result = this._partyService.candidateParty.filter(function (candidate){
      return candidate.Id = candidateId;
    });
    if (result[0].IsActive == '0') {
      result[0].IsActive = '1';
    } else {
      result[0].IsActive = '0';
    }
  }
}
