import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {PortalComponent} from "./portal.component";



const routes: Routes = [{
  path: '',
  component: PortalComponent,
  children: [
    {
      path: 'persons',
      loadChildren: () => import('./person/person.module')
        .then(m => m.PersonModule)
    },{
      path: 'nomenclator',
      loadChildren: () => import('./nomenclator/nomenclator.module')
        .then(m => m.NomenclatorModule)
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule{
}
