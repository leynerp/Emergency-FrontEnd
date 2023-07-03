import {Component, Inject} from "@angular/core";
import {Button, Buttons, MessageType} from "../common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Subject} from "rxjs";

@Component({
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent {

  title = '';
  message = '';
  buttons: Buttons = Buttons.Ok;
  messageType:MessageType=MessageType.Info;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.messageType=data.mType;
    this.title = data.title;
    this.message = data.message
    this.buttons = data.buttons;
  }

  dialogResultSubject = new Subject<Button>();
  dialogResult$ = this.dialogResultSubject.asObservable();

  public get Buttons(): typeof Buttons {
    return Buttons;
  }
  public get MessageType(): typeof MessageType {
    return MessageType;
  }
  public get Button(): typeof Button {
    return Button;
  }

  click(button: Button) {
    this.dialogResultSubject.next(button);
  }
}
