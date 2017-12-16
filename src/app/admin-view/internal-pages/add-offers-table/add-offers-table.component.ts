import { Component, OnInit } from '@angular/core';
import { AddOffersService } from 'app/admin-view/shared/add-offers.service';
import { Router } from '@angular/router';
import { AddOffer } from 'app/admin-view/models/addoffer';

@Component({
  selector: 'app-add-offers-table',
  templateUrl: './add-offers-table.component.html',
  styleUrls: ['./add-offers-table.component.scss']
})
export class AddOffersTableComponent implements OnInit {

  offerList: AddOffer[] = new Array<AddOffer>();
  constructor(private _offerService: AddOffersService, private router: Router) {
    this.offerList = this._offerService.addOfferArray;
   }

  ngOnInit() {
  }


  addNewOffer() {
    this.router.navigateByUrl('/pages/addOffers');
  }

}
