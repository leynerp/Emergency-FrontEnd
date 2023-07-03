export enum Buttons {
  Ok,
  YesNo
}

export enum Button {
  Ok,
  Yes,
  No
}
export enum MessageType {
  Error,
  Info,
  Question
}
export interface MessageFormat {
    status:number;
    message:string;
}
