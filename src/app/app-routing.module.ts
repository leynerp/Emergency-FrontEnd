import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoguinComponent} from "./@shared/components/loguin/loguin.component";
const routes: Routes = [
  {
    path: 'portal',
    loadChildren: () => import('./portal/portal.module')
      .then(m => m.PortalModule)
  },
  { path: '', redirectTo: 'portal', pathMatch: 'full' },
  { path: '**', redirectTo: 'ttt' },
  {path: 'login', component:LoguinComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
