import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BogComponentsModule } from './bog-components/bog-components.module';
import { ApiServicesModule } from './api-services/api-services.module';

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
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
