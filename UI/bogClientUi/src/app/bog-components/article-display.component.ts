import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetArticleContentServiceService } from '../api-services/get-article-content-service.service';

@Component({
  selector: 'app-article-display',
  templateUrl: './article-display.component.html'
})
export class ArticleDisplayComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private getArticleContentService:GetArticleContentServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      let contentId = paramMap.get('contentId');
      let title = paramMap.has('title') ? paramMap.get('title') : '';

      this.getArticleContentService.getArticles(contentId, title).subscribe(
        httpResult =>{
          console.log(httpResult);
        }
      );
    });
  }

}
