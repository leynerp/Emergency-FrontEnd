import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import config from "./config.json";
import {Injectable} from "@angular/core";
export interface Credential {
  userName:String;
  password:String;
}

@Injectable()
export class LoginService {
  constructor(private _httpClient: HttpClient) {}
  login(credential:Credential): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const body=JSON.stringify(credential);
    return this._httpClient.post<any>(config.url.login,body,{headers});
  }


}

