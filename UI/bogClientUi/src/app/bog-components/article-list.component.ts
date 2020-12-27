import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GetArticleListServiceService } from '../api-services/get-article-list-service.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private getArticleListService:GetArticleListServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      let pageNumberParam = Number(paramMap.get("page"));
      let currentPage = pageNumberParam || 0;
      this.getArticleListService.getArticles(currentPage).subscribe(
        httpResult =>{
          console.log(httpResult);
        },
        httpFailedResult=>{
          console.log(httpFailedResult);
        }
      );
    });
  }
}
