import { Observable } from 'rxjs';

export interface DocumentType {
  idDocument: string;
  denomination: string;
}
export abstract class NomenclatorData {
  abstract getAllDocument(): Observable<DocumentType[]>;

}
