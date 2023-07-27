import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageNomComponent } from './manage-nom/manage-nom.component';
import {NomenclatorRoutingModule} from "./nomenclator-routing";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FormNomenclatorComponent } from './principal/form-nomenclator.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import { ListNomenclatorComponent } from './list-nomenclator/list-nomenclator.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TokenInterceptor} from "../../@core/utils/token.interceptor";
@NgModule({
  declarations: [
    ManageNomComponent,
    FormNomenclatorComponent,
    ListNomenclatorComponent
  ],
  imports: [
    HttpClientModule,
    NomenclatorRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor,multi:true}]
})
export class NomenclatorModule { }
