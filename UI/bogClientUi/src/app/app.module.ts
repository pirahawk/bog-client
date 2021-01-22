import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BogComponentsModule } from './bog-components/bog-components.module';
import { ApiServicesModule } from './api-services/api-services.module';
import { GetBogConfigurationService } from './api-services/get-bog-configuration-service.service';
import { GetMenuConfigurationService } from './api-services/get-menu-configuration.service';

export function startupServiceFactory(
  configurationService: GetBogConfigurationService,
  menuConfigurationService: GetMenuConfigurationService): Function {
    const configurationPromise = configurationService.load();
    const menuConfigurationPromise = menuConfigurationService.load();

    return () => configurationPromise
    .then(response => menuConfigurationPromise);
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ApiServicesModule,
    AppRoutingModule,
    BogComponentsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [GetBogConfigurationService, GetMenuConfigurationService],
      multi: true
    }
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
