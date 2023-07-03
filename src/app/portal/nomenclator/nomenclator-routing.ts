import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ConfigComponent} from "./config/config.component";



const routes: Routes = [
  { path: 'list', component:ConfigComponent},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NomenclatorRoutingModule {
}
