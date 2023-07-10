import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import {PersonRoutingModule} from "./person-routing.module";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {HttpClientModule} from "@angular/common/http";
import { FindComponent } from './find/find.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from '@angular/material/button';
import {FormPersonComponent} from './form-person/form-person.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from "@angular/material/select";
import {NomenclatorModule} from "../nomenclator/nomenclator.module";
import {AppPersonDialog} from "./form-person/dialog-persons-component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TableTitleDirective} from "../../@shared/directives/table-title.directive";
import {MatIconModule} from "@angular/material/icon";
import { ManageComponent } from './manage/manage.component';
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    ListComponent,
    FindComponent,
    FormPersonComponent,
    AppPersonDialog,
    TableTitleDirective,
    ManageComponent
  ],
    imports: [
        HttpClientModule,
        CommonModule,
        PersonRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatSortModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSelectModule,
        NomenclatorModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatTabsModule
    ]
})
export class PersonModule { }
