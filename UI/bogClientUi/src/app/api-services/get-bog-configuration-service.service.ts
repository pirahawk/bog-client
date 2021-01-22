import { Injectable } from '@angular/core';
import { SiteConfiguration } from './models/serviceConfiguration';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { observable, of } from 'rxjs';

@Injectable()
export class GetBogConfigurationService {
  private siteConfiguration: SiteConfiguration;
  public get SiteConfiguration(): SiteConfiguration {
    return this.siteConfiguration;
  }

  public load(): Promise<SiteConfiguration> {
    const configXhrRequest = ajax('/config')
      .pipe(
        catchError(ajxError =>{
          console.error(`Could not load site configuration: ${ajxError}`);
          return of(ajxError);
        }),
        map(ajxResponse => {
        if (ajxResponse.status !== 200) {
          console.error(`Could not load site configuration: ${ajxResponse}`);
          return;
        }
        this.siteConfiguration = ajxResponse.response as SiteConfiguration;
        return this.siteConfiguration;
      }));

    return configXhrRequest.toPromise();
  }
}
