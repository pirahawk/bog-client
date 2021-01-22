import { Injectable } from '@angular/core';
import { MenuConfiguration } from './models/menuConfiguration';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class GetMenuConfigurationService {
  private menuConfiguration: MenuConfiguration;
  public get MenuConfiguration(): MenuConfiguration {
    return this.menuConfiguration;
  }

  public load(): Promise<MenuConfiguration> {
    const menuConfigXhrRequest = ajax('/menuConfig')
      .pipe(
        catchError(ajxError =>{
          console.error(`Could not load menu configuration: ${ajxError}`);
          return of(ajxError);
        }),
        map(ajxResponse => {
        if (ajxResponse.status !== 200) {
          console.error(`Could not load menu configuration: ${ajxResponse}`);
          return;
        }
        this.menuConfiguration = ajxResponse.response as MenuConfiguration;
        return this.menuConfiguration;
      }
      ));

    return menuConfigXhrRequest.toPromise();
  }
}
