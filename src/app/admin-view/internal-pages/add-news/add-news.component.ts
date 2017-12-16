import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService } from 'app/admin-view/shared/news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {

  titleAlert = 'This field is required';
  addNews: FormGroup;

  constructor(private _fb: FormBuilder, private router: Router, private _newsService: NewsService) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.addNews = this._fb.group({
      NewsId: [''],
      NewsType: ['', Validators.required],
      NewsFor: ['', Validators.required],
      Heading: ['', Validators.required],
      Description: ['', Validators.required]
    });
  }

  addNewsData(newsData) {
    console.log(newsData);
    this._newsService.addNews(newsData);
    this.router.navigateByUrl('/pages/addnewstable');
  }

  cancelData() {
    this.router.navigateByUrl('/pages/addnewstable');
  }
}
