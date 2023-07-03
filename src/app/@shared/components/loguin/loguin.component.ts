import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Credential, LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.scss']
})
export class LoguinComponent implements OnInit {
  loginFormGroup!: FormGroup;
  @ViewChild('loginForm') loginForm: any;
  userName: String | undefined;
  password: String | undefined;
  loginInvalid: Boolean = false;
  constructor(private fLoginBuilder: FormBuilder, private loginService: LoginService, private routes:Router) {
  }

  hide: boolean = true;

  ngOnInit(): void {
    const token=localStorage.getItem('token');
    if (token)
      this.routes.navigateByUrl("/portal");
    this.loginFormGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fLoginBuilder.group({
      userName: [this.userName, [Validators.required, Validators.minLength(3)]],
      password: [this.password, [Validators.required]]
    });

  }

  login() {
    const credential: Credential = {
      userName: this.loginFormGroup.value.userName,
      password: this.loginFormGroup.value.password
    }
    this.loginService.login(credential)
      .subscribe({
          next: (token) => {
            const {accessToken} = token;
            localStorage.setItem('token', accessToken);
            this.loginInvalid=false;
            this.routes.navigateByUrl("/portal")
          },
          error:()=>{
            this.loginInvalid=true;
            localStorage.removeItem('token');

          }
        }
      );
  }

}
