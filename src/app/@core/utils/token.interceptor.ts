import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private readonly APIToken:string;
  private defaultApplicationHeaders = {
    'Content-Type': 'application/json',
    'Authorization': '',
  }

  buildRequestHeaders():HttpHeaders {
    let headers = this.defaultApplicationHeaders;
    // set API-Token if available
    if(this.APIToken !== null) {
      let authHeaderTpl = `Bearer ${this.APIToken}`;
      headers['Authorization'] = authHeaderTpl
    }
    return new HttpHeaders(headers);
  }
  constructor() {
    this.APIToken = localStorage.getItem('token') as string;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const headers = this.buildRequestHeaders();
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
