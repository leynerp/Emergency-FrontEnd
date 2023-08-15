import { Component } from '@angular/core';

//import { MENU_ITEMS } from './portal-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-one-column-layout>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PortalComponent {

}
