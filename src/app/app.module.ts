import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { CoreModule } from './@core/core.module';
import { SharedModule } from './@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NomenclatorModule} from "./portal/nomenclator/nomenclator.module";
import {TokenInterceptor} from "./@core/utils/token.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        MatTooltipModule,
        CoreModule.forRoot(),
        SharedModule.forRoot(),
        BrowserAnimationsModule,
        NomenclatorModule
    ],
    providers: [{provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
