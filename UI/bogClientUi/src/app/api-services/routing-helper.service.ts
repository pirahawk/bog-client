import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable()
export class RoutingHelperService {
  constructor(private location: Location) {}

  public navigateToPage(router: Router, page: number): Promise<boolean>{
    if (!router){
      return of(false).toPromise();
    }

    return router.navigate(['0'], { skipLocationChange: false, replaceUrl: true });
  }

  public navigateError(router: Router, errorCode: number): Promise<boolean>{
    if (!router){
      return of(false).toPromise();
    }

    return router.navigate(['error', 404], { skipLocationChange: false, replaceUrl: true });
  }

  public tryNavigateBack(router: Router): Promise<boolean>{
    if (!router){
      return of(false).toPromise();
    }

    this.location.back();
  }
}
