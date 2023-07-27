import { Observable } from 'rxjs';
import {MessageFormat, ResponseListApi} from "../../../../@shared/components/common";
export interface Person {
  id_person:number;
  name: string;
  f_last_name: string;
  s_last_name: string;
  no_identification:number;
}

export interface Doctor extends Person{
  medical_registry:string;
}

export interface Shipper extends Person{
  registry:string;
}

export interface Agent extends Person{
  agent_number:string;
}


export type PersonAdd=Omit<Agent, 'id_person'> | Omit<Shipper, 'id_person'> | Omit<Doctor, 'id_person'>;

export enum PersonsType {
  Doctor='doctor',
  Agent='agent',
  Shipper='shipper'
}


export abstract class PersonData {
  abstract getPersons(start:number,limit:number,type:PersonsType): Observable<ResponseListApi<Person>>;
  abstract insertPerson(newPerson:PersonAdd,type:PersonsType): Observable<MessageFormat>;
  abstract updatePerson(updatePerson:PersonAdd,type:PersonsType,id:number): Observable<MessageFormat>;
  abstract deletePerson(id:number,type:PersonsType): Observable<MessageFormat>;

}
