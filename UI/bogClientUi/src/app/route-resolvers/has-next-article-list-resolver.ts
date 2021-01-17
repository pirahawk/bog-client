import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of} from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { GetArticleListService } from '../api-services/get-article-list-service.service';
import { ContentResponse } from '../api-services/models/contentResponse';

@Injectable({
  providedIn: 'root',
})
export class HasNextArticleListResolver implements Resolve<boolean> {
  constructor(private getArticleListService: GetArticleListService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const currentPage = route.paramMap.has('page') ? Number(route.paramMap.get('page')) : 0;
    return this.getArticleListService.getArticles(currentPage+1)
    .pipe(catchError(err => of(err)),
    mergeMap(response => {
      const httpResponse =  response as HttpResponse<ContentResponse[]>;
      return of(httpResponse && httpResponse.status === 200 && httpResponse.body && httpResponse.body.length > 0);
    })
    );
  }
}
