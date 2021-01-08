import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GetArticleContentService } from '../api-services/get-article-content-service.service';
import { HeaderManagerService } from '../api-services/header-manager-service.service';
import { ArticleContentResult } from '../api-services/models/articleContentResult';
import { RoutingHelperService } from '../api-services/routing-helper.service';

@Component({
  selector: 'app-article-display',
  templateUrl: './article-display.component.html'
})
export class ArticleDisplayComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private routingHelper: RoutingHelperService,
              private getArticleContentService: GetArticleContentService,
              private headerManagerService: HeaderManagerService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      data =>{
        if(!data.articleContent){
          this.routingHelper.navigateError(this.router, 404);
          return;
        }

        this.updateHeaderTags(data.articleContent);
        console.log(data);
      },

      err => {
        console.log(err);
        this.routingHelper.navigateError(this.router, 404);
        this.router.navigate(['error', 404], { skipLocationChange: false });
      }
    );
  }

  private updateHeaderTags(articleResult: ArticleContentResult): void {
    const article = articleResult.article;
    this.headerManagerService.tryUpdateDocumentHeader(article.title, article.description, article.author);
  }
}
