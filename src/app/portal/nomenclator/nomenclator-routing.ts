import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ManageNomComponent} from "./manage-nom/manage-nom.component";



const routes: Routes = [
  { path: 'list', component:ManageNomComponent},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NomenclatorRoutingModule {
}
