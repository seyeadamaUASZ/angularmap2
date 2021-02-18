import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { AngularMaterialModule} from './material.module';
import {  ChartModule } from 'angular-highcharts';
import { HttpClientModule } from '@angular/common/http';
import { CartoComponent } from './carto/carto.component';

@NgModule({
  declarations: [
    AppComponent,
    CartoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ChartModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBdr9SO9PcLcGYCkd9lnpk-ntDG8fux3YY'
      //libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
