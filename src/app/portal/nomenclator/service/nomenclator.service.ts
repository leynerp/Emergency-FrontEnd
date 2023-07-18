import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Nomenclator,NomenclatorsType, NomenclatorData} from "./data/nomenclator-data";
import {environment} from "../../../../environments/environment";
@Injectable()
export class NomenclatorService extends NomenclatorData {
  private readonly API=environment.nomenclatorApi
  constructor(private _httpClient: HttpClient) {
    super();
  }
  getAllDocument(): Observable<Nomenclator[]> {
    const requestUrl = `${this.API}/${NomenclatorsType.DOCUMENT_TYPE.toString()}/${0}/${10}`;
    return this._httpClient.get<Nomenclator[]>(requestUrl);
  }

}

