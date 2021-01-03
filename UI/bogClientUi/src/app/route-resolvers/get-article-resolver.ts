import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of} from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { GetArticleContentService } from '../api-services/get-article-content-service.service';
import { ArticleContentResult } from '../api-services/models/articleContentResult';


@Injectable({
  providedIn: 'root',
})
export class GetArticleResolver implements Resolve<ArticleContentResult |null> {
  constructor(private getArticleContentService: GetArticleContentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArticleContentResult | null> {
    const contentId = route.paramMap.has('contentId') ? route.paramMap.get('contentId') : null;
    const title = route.paramMap.has('title') ? route.paramMap.get('title') : null;

    if (!contentId){
      return of(null);
    }

    return this.getArticleContentService.getArticle(contentId, title)
    .pipe(catchError(err => of(err)),
    mergeMap(response => {
      const httpResponse =  response as HttpResponse<ArticleContentResult>;
      return httpResponse && httpResponse.status === 200 ? of(httpResponse.body) : of(null);
    })
    );
  }
}
