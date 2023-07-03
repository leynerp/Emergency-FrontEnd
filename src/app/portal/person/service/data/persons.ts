import { Observable } from 'rxjs';
import {MessageFormat} from "../../../../@shared/components/common";
export interface Person {
  idPerson:number;
  name: string;
  firstLastName: string;
  secondLastName: string;
  documentIdentity:Array<DocumentPerson>;
}

export interface PersonListApi{
  data:Person[],
  total_count:number
}

export type PersonAdd=Omit<Person, 'idPerson'|'documentIdentity'> & {
  documentIdentity:Array<DocumentPersonAdd>
}

export interface DocumentPerson {
  noIdentity:String;
  idPersonDocumenttype:number;
  typeIdentity:String,
  idDocType:number,
  main:number
}
export type DocumentPersonAdd=Omit<DocumentPerson, 'idPersonDocumenttype'|'typeIdentity'>


export abstract class PersonData {
  abstract getPersons(start:number,limit:number): Observable<PersonListApi>;
  abstract getDocumentPerson(): Observable<DocumentPerson[]>;
  abstract insertPerson(newPerson:PersonAdd): Observable<MessageFormat>;
  abstract updatePerson(updatePerson:Person): Observable<Person>;
  abstract deletePerson(id:number): Observable<MessageFormat>;

}
