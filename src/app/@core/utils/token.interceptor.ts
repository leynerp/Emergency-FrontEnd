import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

 /* intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=localStorage.getItem('token');
    if (token){
      const requestClone=request.clone({
        headers:request.headers.set('Authorization',`Bearer ${token}`)
                              // .set('Authorization',`Bearer ${token}`)
      });
      /*const requestClone=request.clone({
        setHeaders:{authorization:`Bearer ${token}`}
      })
      return next.handle(requestClone);
    }
    return next.handle(request);
  }*/
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken=localStorage.getItem('token');

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (authToken){
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
       return next.handle(authReq);
    }
      return next.handle(req);
    }
}
