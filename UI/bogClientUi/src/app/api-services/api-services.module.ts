import { ajax } from 'rxjs/ajax';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetArticleListService } from './get-article-list-service.service';
import { GetArticleContentService } from './get-article-content-service.service';
import { GetBogConfigurationService } from './get-bog-configuration-service.service';
import { SiteConfiguration } from './models/serviceConfiguration';
import { HeaderManagerService } from './header-manager-service.service';

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
    HeaderManagerService
  ]
})
export class ApiServicesModule { }
