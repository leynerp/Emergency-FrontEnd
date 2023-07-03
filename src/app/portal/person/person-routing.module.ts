import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import {FindComponent} from "./find/find.component";
import {PersonsResolver} from "./service/persons.resolver";


const routes: Routes = [
  { path: 'list',resolve: {documentType:PersonsResolver}, component:ListComponent},
  {path: 'find', component:FindComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule {
}
