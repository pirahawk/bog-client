import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetArticleContentService } from '../api-services/get-article-content-service.service';
import { HeaderManagerService } from '../api-services/header-manager-service.service';
import { ArticleContentResult } from '../api-services/models/articleContentResult';
import { RemoveServerContentService } from '../api-services/remove-server-content.service';
import { RoutingHelperService } from '../api-services/routing-helper.service';

@Component({
  selector: 'app-article-display',
  templateUrl: './article-display.component.html'
})
export class ArticleDisplayComponent implements OnInit {
  public articleContent: ArticleContentResult;
  private hasUpdatedContent: boolean;
  public get pullArticleContent(): boolean{
    if (this.articleContent && !this.hasUpdatedContent){
      const contentElement = document.getElementById(`content-${this.articleContent.article.id}`);

      if (contentElement){
        contentElement.innerHTML = atob(this.articleContent.encodedContent);
        this.hasUpdatedContent = true;
      }
    }
    return true;
  }

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private routingHelper: RoutingHelperService,
              private getArticleContentService: GetArticleContentService,
              private headerManagerService: HeaderManagerService,
              private serverContentService: RemoveServerContentService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      data => {
        if (!data.articleContent){
          this.routingHelper.navigateError(this.router, 404);
          return;
        }

        this.updateHeaderTags(data.articleContent);
        console.log(data);
        this.serverContentService.hideServerContent();
        this.articleContent = data.articleContent;
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
