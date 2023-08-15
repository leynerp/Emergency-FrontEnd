import { MatDialog } from "@angular/material/dialog";
import {Button, Buttons, MessageType} from "../common";
import { Observable, Subject } from "rxjs";
import { MessageBoxComponent } from "./message-box.component";
import { Injectable } from "@angular/core";

@Injectable()
export class MessageBox {
  constructor(private dialog: MatDialog) {
  }

  private dialogResultSubject!: Subject<Button>;
  dialogResult$!: Observable<Button>;

  show(message: string, title?: string, buttons?: Buttons,mType?:MessageType): MessageBox {

    let dialogRef = this.dialog.open(MessageBoxComponent, {
        data: {
          mType:mType ?? MessageType.Info,
          message,
          title,
          buttons: buttons ?? Buttons.Ok
        },
      disableClose:true
      }
    );
    this.dialogResultSubject = new Subject<Button>();
    this.dialogResult$ = this.dialogResultSubject.asObservable()

    dialogRef.componentInstance.dialogResult$.subscribe(pressedButton => {
      this.dialogResultSubject.next(pressedButton);
      this.dialogResultSubject.complete();
      dialogRef.close();
    });

    return this;
  }
}
