import { Injectable } from '@angular/core';
import { AddParty } from 'app/admin-view/models/party';
import { FundDetails } from 'app/admin-view/models/fundDetails';
import { PartyCandidateList } from 'app/admin-view/models/partyCandidateList';
import { PartyRepresentative } from 'app/admin-view/models/partyRepresentative';
import { Http } from '@angular/http';

@Injectable()
export class PartyServiceService {

    partyArray: AddParty[] = [];
    partyRep: PartyRepresentative[] = new Array<PartyRepresentative>();
    partyFundArray: FundDetails[] = new Array<FundDetails>();
    candidateParty: PartyCandidateList[] = new Array<PartyCandidateList>();
    public tempData: any;
    tmpPartyArray: PartyRepresentative;
    storageEl: any;
    index: number;

    baseUrl: string = 'http://mh.truevoters.in/WebServices/Party.svc';

  constructor(private http: Http) {
    this.partyRep = [
      {
      ID: '1',
      RepMobileNo: '9326854760',
      PartyId: 'ABC',
      RegistrationDate: '2017-12-02',
      DistrictId: 'PUNE',
      Symbols: 'SWARD',
      LocalBodyId: 'PUNE',
      PartyName: 'ABC',
      Rep_Name: 'XYZ',
      RoleId: 1,
      IsActive: '0',
      MobileNo: '',
      TokenId: ''
    },
    {
      ID: '2',
      RepMobileNo: '7308213174',
      PartyId: '2',
      RegistrationDate: '2017-12-02',
      Symbols: 'SWARD',
      DistrictId: 'PUNE',
      LocalBodyId: 'PUNE',
      PartyName: 'SWRAJYA',
      Rep_Name: 'ABC',
      RoleId: 1,
      IsActive: '1',
      MobileNo: '',
      TokenId: ''
    }
  ];
    this.index = 0;
    this.candidateParty = [
      {
          Id: '1',
          PartyTypeId: 1,
          PartyTypeText: 'asdb',
          PartyNameId: 2,
          PartyNameText: 'fsdhf',
          DistId: 1,
          DistName: 'fsdfs',
          LocalBodyType: 1,
          LocalBodyTypeText: 'fsdfsdf',
          LocalBodyId: 1,
          LocalBodyIdText: 'sdfsdfsfs',
          ElectionTypeId: 1,
          ElectionTypeText: 'fsdfsdf',
          ElectionDate: '2017-12-04',
          CandidateName: 'fsdfsddf',
          CandidateMoNo: '54354353',
          WardNo: '4',
          SeatNo: '1',
          VerifiedId: 'Verified',
          NomiWithdrawId: 'Yes',
          ElectionResultId: 'Won',
          CreatedBy: 'sdfsdfs',
          CreatedDate: '2017-12-04',
          ModifiedBy: 'gdfgfdg',
          ModifiedDate: '2017-12-04',
          IsActive: '0',
          MobileNo: '4342342342',
          TokenId: '4234234234'
      }
    ];
    this.partyFundArray = [
      {
          Address: 'abc',
          Amount: 100,
          CheckNo: 423846327,
          CheckDate: '2017-12-04',
          CreatedBy: 'abc',
          CreatedDate: '2017-12-04',
          Date: '2017-12-04',
          FromWhom: 1,
          FromWhomText: 'sdfghshf',
          FundID: 1,
          FundType: 2,
          FundTypeText: 'Gift',
          IMEINo: '0',
          IsActive: 0,
          MobileNo: '515164861',
          ModifyBy: 'abc',
          ModifyDate: '2017-12-04',
          ModifiedBy: 'abc',
          ModifiedDate: '2017-12-04',
          PaidBy: 2,
          ProviderBankName: 'dhagdajsd',
          ProviderMobileNo: '63472846',
          ProviderName: 'gfshdfgsdjfg',
          Status: '',
          TokenId: ''
      },
      {
        Address: 'def',
        Amount: 200,
        CheckNo: 0,
        CheckDate: '2017-12-03',
        CreatedBy: 'def',
        CreatedDate: '2017-12-03',
        Date: '2017-12-03',
        FromWhom: 1,
        FromWhomText: 'sdfghshf',
        FundID: 2,
        FundType: 3,
        FundTypeText: 'Loan',
        IMEINo: '0',
        IsActive: 0,
        MobileNo: '8645684',
        ModifyBy: 'def',
        ModifyDate: '2017-12-03',
        ModifiedBy: 'def',
        ModifiedDate: '2017-12-03',
        PaidBy: 1,
        ProviderBankName: 'hgjhgjyt',
        ProviderMobileNo: '54646456',
        ProviderName: 'kjhkhjkhjk',
        Status: '',
        TokenId: ''
    }
    ];
   }

   getPartydata(): Array<AddParty> {
     return this.partyArray = [
      {
        PTID: 1,
        PartyName: 'BJP',
        RegistrationDate: '11/30/2017',
        Symbols: 'dasd',
        ContactPersonName: 'dsadas',
        ContactPersonMobile: '9876543210',
        HeadAddress: 'dasd',
        MobileNo: '112121212',
        TokenId: '3213123123'
      },
      {
        PTID: 2,
        PartyName: 'ABC',
        RegistrationDate: '2017-11-29',
        Symbols: 'Lotus',
        ContactPersonName: 'ABC',
        ContactPersonMobile: '987654337',
        HeadAddress: 'dasd',
        MobileNo: '212222121',
        TokenId: '21212'
      }
    ];
   }

   addPartyFundDetails(partyFundData): Array<FundDetails> {
    console.log(partyFundData);
    this.partyFundArray.push(partyFundData);
    console.log(this.partyFundArray);
    return this.partyFundArray;
   }

   editFundData(fundId: number): FundDetails {
     let result = this.partyFundArray.filter(function (fund){
       return fund.FundID == fundId;
     });
    // for (let i = 0; i < this.partyFundArray.length; i++) {
    //   if (this.partyFundArray[i].FundID = fundId) {
    //     this.storageEl = this.partyFundArray[i];
    //   }
    // }
    // return this.tempData = this.storageEl;
     return this.tempData = result[0];
   }

   addPartyCandidate(candidateData) {
    this.candidateParty.push(candidateData);
   }

   editCandidateData(candidateId): PartyCandidateList {
    var result = this.candidateParty.filter(function (candidate){
      return candidate.Id == candidateId;
    });

    return result[0];
   }
   getpartyRep(mobileNo: string) {
    console.log(mobileNo);
   const result = this.partyRep.filter(function (partyRepData) {
     return partyRepData.RepMobileNo == mobileNo;
   });
   console.log(result);
   return this.tmpPartyArray = result[0];
  }

  checkMobileNo(partyArrayObj: AddParty) {
    this.partyArray[0] = partyArrayObj;
    return this.http.post(this.baseUrl + '/CheckPartyOffMob/ChkMobNo', JSON.stringify(this.partyArray))
    .map(res => res.json()['CheckPartyOffMobResult']);
  }

}
