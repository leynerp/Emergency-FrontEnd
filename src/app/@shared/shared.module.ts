import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent
} from './components';
import {
  PluralPipe,
  RoundPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
} from './layouts';
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {RouterLink} from "@angular/router";
import { MessageBoxComponent } from './components/message-box/message-box.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MessageBox} from "./components/message-box/menssague-box-provider";
import {MatIconModule} from "@angular/material/icon";
import { LoguinComponent } from './components/loguin/loguin.component';
import {MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {LoginService} from "./components/loguin/login.service";



const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  SearchInputComponent,
  OneColumnLayoutComponent,
  MessageBoxComponent

];
const PIPES = [
  PluralPipe,
  RoundPipe,
  NumberWithCommasPipe,
];


@NgModule({
    imports: [MatIconModule, CommonModule, RouterLink, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES, LoguinComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        MessageBox,LoginService
      ],
    };
  }
}
