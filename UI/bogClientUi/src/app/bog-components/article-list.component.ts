import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GetArticleListService } from '../api-services/get-article-list-service.service';
import { GetBogConfigurationService } from '../api-services/get-bog-configuration-service.service';
import { HeaderManagerService } from '../api-services/header-manager-service.service';
import { ContentResponse } from '../api-services/models/contentResponse';
import { RemoveServerContentService } from '../api-services/remove-server-content.service';
import { RoutingHelperService } from '../api-services/routing-helper.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {

  public articleList: ContentResponse[];
  public currentPage: number;
  public hasNextPage: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private routingHelper: RoutingHelperService,
              private getArticleListService: GetArticleListService,
              private bogConfigurationService: GetBogConfigurationService,
              private headerManagerService: HeaderManagerService,
              private serverContentService: RemoveServerContentService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      const pageNumberParam = Number(paramMap.get('page'));
      this.currentPage = pageNumberParam || 0;

      this.activatedRoute.data.subscribe(
        data => {
          this.hasNextPage = data.hasNextArticles;
          this.articleList = data?.articlesList ?? [];

          if (this.currentPage > 0 && (!data?.articlesList || this.articleList.length <= 0)){
            this.routingHelper.tryNavigateBack(this.router);
            return;
          }

          this.updateHeaderTags();
          console.log(data);
          this.serverContentService.hideServerContent();
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  private updateHeaderTags(): void {
    const siteConfiguration = this.bogConfigurationService.SiteConfiguration;
    this.headerManagerService.tryUpdateDocumentHeader(siteConfiguration.title, siteConfiguration.description, siteConfiguration.author);
  }
}
