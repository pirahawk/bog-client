import { ajax } from 'rxjs/ajax';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetArticleListServiceService } from './get-article-list-service.service';
import { GetArticleContentServiceService } from './get-article-content-service.service';
import { GetBogConfigurationServiceService } from './get-bog-configuration-service.service';
import { SiteConfiguration } from './models/serviceConfiguration';

const configurationServiceFactory = () => new GetBogConfigurationServiceService();


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {provide:GetBogConfigurationServiceService, useValue: configurationServiceFactory()},
    GetArticleListServiceService,
    GetArticleContentServiceService
  ]
})
export class ApiServicesModule { }
