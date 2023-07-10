import { Observable } from 'rxjs';
import {MessageFormat} from "../../../../@shared/components/common";
export interface Person {
  idPerson:number;
  name: string;
  fLastname: string;
  secLastname: string;
  noIdentification:number;
}

export interface Doctor extends Person{
  medicalRegistry:string;
}

export interface Shipper extends Person{
  registry:string;
}

export interface Agent extends Person{
  identificationNumber:string;
}

export interface PersonListApi{
  data:Person[],
  total_count:number
}

export type PersonAdd=Omit<Person, 'idPerson'|'documentIdentity'> & {
  documentIdentity:Array<DocumentPersonAdd>
}
export enum PersonsType {
  Doctor='doctor',
  Agent='agent',
  Shipper='shipper'
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
  abstract getPersons(start:number,limit:number,type:PersonsType): Observable<PersonListApi>;
  abstract getDocumentPerson(): Observable<DocumentPerson[]>;
  abstract insertPerson(newPerson:PersonAdd,type:PersonsType): Observable<MessageFormat>;
  abstract updatePerson(updatePerson:Person): Observable<Person>;
  abstract deletePerson(id:number,type:PersonsType): Observable<MessageFormat>;

}
