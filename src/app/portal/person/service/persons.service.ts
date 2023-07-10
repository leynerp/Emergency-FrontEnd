import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {DocumentPerson, Person, PersonAdd, PersonData, PersonListApi, PersonsType} from "./data/persons";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import config from "./config.json";
import {MessageFormat} from "../../../@shared/components/common";
@Injectable()
export class PersonsService extends PersonData {
    constructor(private _httpClient: HttpClient) {
    super();
  }
  getDocumentPerson(): Observable<DocumentPerson[]> {
    const requestUrl = `${config.url.api}/${0}/${10}`;
    return this._httpClient.get<DocumentPerson[]>(requestUrl);

  }
  getPersons(start:number=0,limit:number=10,type:PersonsType): Observable<PersonListApi> {
    const requestUrl = `${config.url.api}/${type}/${start}/${limit}`;
    return this._httpClient.get<PersonListApi>(requestUrl);
  }
  insertPerson(newPerson:PersonAdd,type:PersonsType): Observable<MessageFormat> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const body=JSON.stringify(newPerson);
    return this._httpClient.post<MessageFormat>(config.url.api,body,{headers});
  }

  updatePerson(updatePerson:Person): Observable<Person> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const body=JSON.stringify(updatePerson);
    return this._httpClient.put<Person>(config.url.api,body,{headers});
  }
  deletePerson(id:number): Observable<MessageFormat> {
    const requestUrl = `${config.url.api}/${id}`;
    return this._httpClient.delete<MessageFormat>(requestUrl);
  }


}
