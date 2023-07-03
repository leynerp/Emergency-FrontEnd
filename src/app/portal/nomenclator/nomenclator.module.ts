import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import {NomenclatorRoutingModule} from "./nomenclator-routing";
import {HttpClientModule} from "@angular/common/http";
import {PersonData} from "../person/service/data/persons";
import {PersonsService} from "../person/service/persons.service";
import {NomenclatorService} from "./service/nomenclator.service";
import {NomenclatorData} from "./service/data/nomenclator-data";




@NgModule({
  declarations: [
    ConfigComponent
  ],
  imports: [
    HttpClientModule,
    NomenclatorRoutingModule,
    CommonModule
  ],
  providers:[{provide:NomenclatorData,useClass: NomenclatorService}]
})
export class NomenclatorModule { }
