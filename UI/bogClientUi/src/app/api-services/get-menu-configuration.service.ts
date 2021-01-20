import { Injectable } from "@angular/core";
import { MenuConfiguration } from "./models/menuConfiguration";
import { ajax } from 'rxjs/ajax';

@Injectable()
export class GetMenuConfigurationService{
  private menuConfiguration:MenuConfiguration;
  public get MenuConfiguration():MenuConfiguration{
    return this.menuConfiguration;
  }

  constructor() {
    ajax('/menuConfig').subscribe(
      ajxResponse => {
        if(ajxResponse.status !== 200){
          console.error(`Could not load menu configuration: ${ajxResponse}`);
          return;
        }
        this.menuConfiguration = ajxResponse.response as MenuConfiguration;
      },
      ajxError => {
        console.error(`Could not load menu configuration: ${ajxError}`);
      }
    );
  }
}
