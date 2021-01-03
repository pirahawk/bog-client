import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetArticleListService } from './get-article-list-service.service';
import { GetArticleContentService } from './get-article-content-service.service';
import { GetBogConfigurationService } from './get-bog-configuration-service.service';
import { HeaderManagerService } from './header-manager-service.service';
import { RoutingHelperService } from './routing-helper.service';

const configurationServiceFactory = () => new GetBogConfigurationService();


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {provide:GetBogConfigurationService, useValue: configurationServiceFactory()},
    GetArticleListService,
    GetArticleContentService,
    HeaderManagerService,
    RoutingHelperService
  ]
})
export class ApiServicesModule { }
