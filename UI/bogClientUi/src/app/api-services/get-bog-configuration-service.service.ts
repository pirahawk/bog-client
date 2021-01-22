import { Injectable } from '@angular/core';
import { SiteConfiguration } from './models/serviceConfiguration';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

@Injectable()
export class GetBogConfigurationService {
  private siteConfiguration: SiteConfiguration;
  public get SiteConfiguration(): SiteConfiguration {
    return this.siteConfiguration;
  }

  constructor() {
    // ajax('/config').subscribe(
    //   ajxResponse => {
    //     if(ajxResponse.status !== 200){
    //       console.error(`Could not load site configuration: ${ajxResponse}`);
    //       return;
    //     }

    //     this.siteConfiguration = ajxResponse.response as SiteConfiguration;
    //   },
    //   ajxError => {
    //     console.error(`Could not load site configuration: ${ajxError}`);
    //   }
    // );
  }

  public load(): Promise<SiteConfiguration> {
    const configXhrRequest = ajax('/config')
      .pipe(map(ajxResponse => {
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
