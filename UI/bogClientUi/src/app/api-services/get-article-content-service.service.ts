import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleContentResult } from './models/articleContentResult';

@Injectable()
export class GetArticleContentService {
  constructor(private httpClient:HttpClient) {
  }

  public getArticle(contentId:string, title:string|null):Observable<HttpResponse<ArticleContentResult>>{
    let apiUrl = `/api/article/${contentId}${!title ? '' : `/${title}`}`;
    return this.httpClient.get<ArticleContentResult>(apiUrl, {observe: 'response'});
  }
}
