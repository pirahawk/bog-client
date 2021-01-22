import { Injectable } from '@angular/core';
import { MenuConfiguration } from './models/menuConfiguration';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

@Injectable()
export class GetMenuConfigurationService {
  private menuConfiguration: MenuConfiguration;
  public get MenuConfiguration(): MenuConfiguration {
    return this.menuConfiguration;
  }

  constructor() {
    // ajax('/menuConfig').subscribe(
    //   ajxResponse => {
    //     if(ajxResponse.status !== 200){
    //       console.error(`Could not load menu configuration: ${ajxResponse}`);
    //       return;
    //     }
    //     this.menuConfiguration = ajxResponse.response as MenuConfiguration;
    //   },
    //   ajxError => {
    //     console.error(`Could not load menu configuration: ${ajxError}`);
    //   }
    // );
  }

  public load(): Promise<MenuConfiguration> {
    const menuConfigXhrRequest = ajax('/menuConfig')
      .pipe(map(ajxResponse => {
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
