import { Observable } from 'rxjs';
import {MessageFormat, ResponseListApi} from "../../../../@shared/components/common";

export interface Nomenclator {
  id: number;
  denomination: string;
  description: string;
  active: number;

}

export enum NomenclatorsType {
  DOCUMENT_TYPE='d_type',
  TYPE_SERVICE='t_service',
  HEALT_UNIT='h_unit',
  MOVIL_TYPE='m_type'
}

export interface ConfigStructure {
  [key: string]: {
    name: string;
    ref: NomenclatorsType;
    icon: string;
  };
}

export abstract class NomenclatorData {
  abstract getData(): Observable<ResponseListApi<Nomenclator>>;
  abstract getDataByRef(ref:NomenclatorsType): Observable<ResponseListApi<Nomenclator>>;
  abstract insertData(data:Nomenclator): Observable<MessageFormat>;
  abstract updateData(dataUpdate:Nomenclator): Observable<MessageFormat>;
  abstract deleteData(id:number): Observable<MessageFormat>;
  abstract setReference(ref:String): void;

}
