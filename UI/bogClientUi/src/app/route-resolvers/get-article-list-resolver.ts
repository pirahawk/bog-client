import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of} from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { GetArticleListService } from '../api-services/get-article-list-service.service';
import { ContentResponse } from '../api-services/models/contentResponse';

/**
 * Got this from https://angular.io/guide/router-tutorial-toh#resolve-pre-fetching-component-data
 * I only used a resolver to prefetch data. A guard did not make sense since the guards run before the
 * resolver so I guess I have to check the validity of the page within the component once it loads and take
 * action accordingly
 */
@Injectable({
  providedIn: 'root',
})
export class GetArticleListResolver implements Resolve<ContentResponse[]|null> {
  constructor(private getArticleListService: GetArticleListService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContentResponse[]|null> {
    const currentPage = route.paramMap.has('page') ? Number(route.paramMap.get('page')) : 0;
    return this.getArticleListService.getArticles(currentPage)
    .pipe(catchError(err => of(err)),
    mergeMap(response => {
      const httpResponse =  response as HttpResponse<ContentResponse[]>;
      return httpResponse && httpResponse.status === 200 ? of(httpResponse.body) : of(null);
    })
    );
  }
}
