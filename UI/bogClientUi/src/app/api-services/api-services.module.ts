import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetArticleListServiceService } from './get-article-list-service.service';
import { GetArticleContentServiceService } from './get-article-content-service.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    GetArticleListServiceService,
    GetArticleContentServiceService
  ]
})
export class ApiServicesModule { }
