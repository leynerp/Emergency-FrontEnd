import { Observable } from 'rxjs';

export interface Nomenclator {
  id: number;
  name: string;
  description: string;
  active: number;

}

export enum NomenclatorsType {
  DOCUMENT_TYPE='d_type',
  TYPE_SERVICE='t_service'
}

export abstract class NomenclatorData {
  abstract getAllDocument(): Observable<Nomenclator[]>;

}
