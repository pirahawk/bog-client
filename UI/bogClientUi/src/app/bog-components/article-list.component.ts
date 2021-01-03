import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GetArticleListService } from '../api-services/get-article-list-service.service';
import { GetBogConfigurationService } from '../api-services/get-bog-configuration-service.service';
import { HeaderManagerService } from '../api-services/header-manager-service.service';
import { RoutingHelperService } from '../api-services/routing-helper.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private routingHelper: RoutingHelperService,
              private getArticleListService: GetArticleListService,
              private bogConfigurationService: GetBogConfigurationService,
              private headerManagerService: HeaderManagerService) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(
      data =>{
        this.updateHeaderTags();
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );

    // this.activatedRoute.paramMap.subscribe(paramMap => {
    //   const pageNumberParam = Number(paramMap.get('page'));
    //   const currentPage = pageNumberParam || 0;
    //   this.getArticleListService.getArticles(currentPage).subscribe(
    //     httpResult => {
    //       this.updateHeaderTags();
    //       console.log(httpResult);
    //     },
    //     httpFailedResult => {
    //       console.log(httpFailedResult);
    //     }
    //   );
    // });
  }

  private updateHeaderTags(): void {
    const siteConfiguration = this.bogConfigurationService.SiteConfiguration;
    this.headerManagerService.tryUpdateDocumentHeader(siteConfiguration.title, siteConfiguration.description, siteConfiguration.author);
  }
}
