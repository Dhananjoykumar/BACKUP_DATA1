import { Component, OnInit } from '@angular/core';
import { NewsData } from 'app/admin-view/models/newsData';
import { NewsService } from 'app/admin-view/shared/news.service';

@Component({
  selector: 'app-add-news-table',
  templateUrl: './add-news-table.component.html',
  styleUrls: ['./add-news-table.component.scss']
})
export class AddNewsTableComponent implements OnInit {

  newsData: NewsData[] = new Array<NewsData>();

  constructor(private _newsService: NewsService) {
    this.newsData = this._newsService.getNews();
  }

  ngOnInit() {
  }

}
