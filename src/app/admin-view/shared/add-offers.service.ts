import { Injectable } from '@angular/core';
import { AddOffer } from 'app/admin-view/models/addoffer';

@Injectable()
export class AddOffersService {

  addOfferArray: AddOffer[] = new Array<AddOffer>();
  constructor() {

    this.addOfferArray = [
      {
        OfferID: 101,
        StateId: '22',
        StateName: 'Maharashtra',
        DistId: '511',
        DistName: 'Pune',
        LocalBodyId: '100',
        LocalBodyName: 'Pune',
        PartyTypeID: 'ABC',
        PartyID: 'National',
        OfferNo: '100',
        OfferHeading: 'NEW',
        OfferCode: '100101',
        OfferStartDate: '2017-12-09',
        OfferEndDate: '2017-12-12',
        MobileNo: '',
        TokenId: ''
      }
    ]};

    addOffers(offerData) {
      this.addOfferArray.push(offerData);
    }

}
