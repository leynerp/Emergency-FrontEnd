import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Nomenclator, NomenclatorData, NomenclatorsType} from "./data/nomenclator-data";
import {environment} from "../../../../environments/environment";
import {MessageFormat, ResponseListApi} from "../../../@shared/components/common";

@Injectable()
export class NomenclatorService extends NomenclatorData {
  private readonly API=environment.nomenclatorApi
  reference!:String;
  constructor(private _httpClient: HttpClient) {
    super();
  }
  setReference(ref:NomenclatorsType):void{
    this.reference = this.getValueByReference(ref);
  }
  getValueByReference(ref:NomenclatorsType):String{
    const index = Object.keys(NomenclatorsType).indexOf(ref);
    return Object.values(NomenclatorsType)[index];
}
  getData(): Observable<ResponseListApi<Nomenclator>> {
    const requestUrl = `${this.API}/${this.reference.toString()}/${0}/${10}`;
    return this._httpClient.get<ResponseListApi<Nomenclator>>(requestUrl);
  }
  insertData(data: Nomenclator): Observable<MessageFormat> {
    const requestUrl = `${this.API}/${this.reference.toString()}`;
    const bodyJson=JSON.stringify(data);
    return this._httpClient.post<MessageFormat>(requestUrl,bodyJson);
  }
  updateData(dataUpdate: Nomenclator): Observable<MessageFormat> {
    const requestUrl=`${this.API}/${this.reference}/${dataUpdate.id}`;
    const bodyJson=JSON.stringify(dataUpdate);
    return this._httpClient.patch<MessageFormat>(requestUrl,bodyJson);
  }

  deleteData(id: number): Observable<MessageFormat> {
    const requestUrl=`${this.API}/${this.reference}/${id}`;
    return this._httpClient.delete<MessageFormat>(requestUrl);
  }


  getDataByRef(ref: NomenclatorsType): Observable<ResponseListApi<Nomenclator>> {
    const requestUrl = `${this.API}/${ref}/${0}/${10}`;
    return this._httpClient.get<ResponseListApi<Nomenclator>>(requestUrl);
  }

}

