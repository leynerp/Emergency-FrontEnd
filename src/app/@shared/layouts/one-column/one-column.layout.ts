import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  template: `
    <header id="header" class="header fixed-top d-flex align-items-center">
      <ngx-header></ngx-header>
    </header><!-- End Header -->
    <aside id="sidebar" class="sidebar">
      <ngx-sidebar></ngx-sidebar>
    </aside>
    <div id="main" class="main">
      <ng-content select="router-outlet"></ng-content>
    </div>

    <footer id="footer" class="footer">
      <ngx-footer></ngx-footer>
    </footer>
  `,
})
export class OneColumnLayoutComponent {}
