import { Injectable } from '@angular/core';
import { NewsData } from 'app/admin-view/models/newsData';

@Injectable()
export class NewsService {

  newsData: NewsData[] = new Array<NewsData>();

  constructor() {
    this.newsData = [
      {
        NewsId: 1,
        NewsType: 1,
        NewsTypeText: 'Public',
        NewsFor: 'All',
        Heading: 'gsahdgh',
        Description: 'eryewfsdfb',
        District: 'dasdasd',
        LocalBodyName: 'fjhgfjkd'
      },
      {
        NewsId: 2,
        NewsType: 2,
        NewsTypeText: 'Officers',
        NewsFor: 'Single',
        Heading: 'rwerwe45',
        Description: 'xzczxczxc',
        District: 'dasdasd',
        LocalBodyName: 'fjhgfjkd'
      },
      {
        NewsId: 3,
        NewsType: 3,
        NewsTypeText: 'Candidates',
        NewsFor: 'All',
        Heading: 'kjgdfgxcmv',
        Description: 'qwerty',
        District: 'dasdasd',
        LocalBodyName: 'fjhgfjkd'
      }
    ];
  }
  
  addNews(newsData) {
    console.log(newsData);
    this.newsData.push(newsData);
  }

  getNews(): Array<NewsData> {
    return this.newsData;
  }
}
