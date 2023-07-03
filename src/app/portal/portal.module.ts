import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@shared/shared.module';
import {PortalRoutingModule} from "./portal-routing.module";
import {PortalComponent} from "./portal.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    PortalComponent
  ],
  imports: [
    HttpClientModule,
    SharedModule,
    PortalRoutingModule,
    CommonModule
  ]
})
export class PortalModule { }
