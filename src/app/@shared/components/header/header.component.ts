import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'ngx-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  constructor(private route: Router) {
  }

  ngOnInit() {

    /*this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);*/
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    document.querySelector('body')?.classList.toggle('toggle-sidebar');
    return false;
  }

  navigateLogin() {
    this.route.navigateByUrl("/login")
    return false;
  }
}
