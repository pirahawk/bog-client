import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetArticleListService } from './get-article-list-service.service';
import { GetArticleContentService } from './get-article-content-service.service';
import { GetBogConfigurationService } from './get-bog-configuration-service.service';
import { HeaderManagerService } from './header-manager-service.service';
import { RoutingHelperService } from './routing-helper.service';
import { RemoveServerContentService } from './remove-server-content.service';
import { GetMenuConfigurationService } from './get-menu-configuration.service';

const configurationServiceFactory = () => new GetBogConfigurationService();
const menuConfigurationFactory = () => new GetMenuConfigurationService();

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: GetBogConfigurationService, useValue: configurationServiceFactory()},
    {provide: GetMenuConfigurationService, useValue: menuConfigurationFactory()},
    GetArticleListService,
    GetArticleContentService,
    HeaderManagerService,
    RoutingHelperService,
    RemoveServerContentService
  ]
})
export class ApiServicesModule { }
