import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RoutingHelperService {
  public get  ParamsMap(): Observable<ParamMap>{
    return this.activatedRoute.paramMap;
  }

  public get RouteData(): Observable<any>{
    return this.activatedRoute.data;
  }

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute ) { }

  public doTest(): void{
    this.activatedRoute.paramMap.subscribe(
      pmap => {
      const contentId = pmap.get('contentId');
      const title = pmap.has('title') ? pmap.get('title') : '';
    }
    );
  }
}
