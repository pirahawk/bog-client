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
    //TODO: do something with this
    this.routingHelper.doTest();

    this.activatedRoute.paramMap.subscribe(paramMap => {
      const contentId = paramMap.get('contentId');
      const title = paramMap.has('title') ? paramMap.get('title') : '';

      this.getArticleContentService.getArticles(contentId, title).subscribe(
        httpResult => {
          const articleResult: ArticleContentResult = httpResult.body;
          this.updateHeaderTags(articleResult);
          console.log(httpResult);
        }
      );
    });
  }

  private updateHeaderTags(articleResult: ArticleContentResult): void {
    const article = articleResult.article;
    this.headerManagerService.tryUpdateDocumentHeader(article.title, article.description, article.author);
  }
}
