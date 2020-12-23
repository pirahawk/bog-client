import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContentResponse } from './models/contentResponse';

@Injectable()
export class GetArticleListServiceService {
  constructor(private httpClient:HttpClient) {
   }

   public getArticles(page:number|null):Observable<HttpResponse<ContentResponse[]>>{
     page = page || 0;
     return this.httpClient.get<ContentResponse[]>(`/api/${page}`, {observe: 'response'});
   }
}
