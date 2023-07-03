import {Component, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DocumentPersonAdd, PersonAdd, PersonData} from "../service/data/persons";
import {DocumentType} from "../../nomenclator/service/data/nomenclator-data";
import {Subject, Subscription} from "rxjs";
import {MessageBox} from "../../../@shared/components/message-box/menssague-box-provider";
import {Button, Buttons} from "../../../@shared/components/common";

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.scss']
})
export class FormPersonComponent implements OnInit, OnChanges, OnDestroy {
  personsForm!: FormGroup;
  @ViewChild('formPerson') formPerson: any;
  title: String = "Add persons";
  name!: String;
  firstLastName!: String;
  secondLastName!: String;
  noIdentity!: String;
  typeIdentity!: String;
  documentType: DocumentType[];
  $subscription!: Subscription;
  $accion!:Subject<String>;
  constructor(private fPersonBuilder: FormBuilder,private mb:MessageBox,private personService:PersonData, private dialogRef: MatDialogRef<FormPersonComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.documentType = data.documentType;
    if (data.personSelected){
      this.name=data.personSelected.name;
      this.firstLastName=data.personSelected.firstLastName;
      this.secondLastName=data.personSelected.secondLastName;
      this.title='Update person';
    }

  };

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.personsForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.personsForm = this.fPersonBuilder.group({
      name: [this.name, [Validators.required, Validators.minLength(3), Validators.pattern("^([a-zA-ZáéíóúñÑ ]+ ?[a-zA-ZáéíóúñÑ ]*)+[^;]*$")]],
      firstLastName: [this.firstLastName, [Validators.required, Validators.minLength(3)]],
      secondLastName: [this.secondLastName, [Validators.required, Validators.minLength(3)]],
      noIdentity: ['', [Validators.required]],
      typeIdentity: ['', [Validators.required]]
    });

  }

  savePerson(closeWindows: boolean): void {
    const arrayDocument: Array<DocumentPersonAdd> = new Array<DocumentPersonAdd>();
    arrayDocument.push({
      noIdentity: this.personsForm.value.noIdentity,
      idDocType: this.personsForm.value.typeIdentity,
      main: 1
    })

    const newPerson: PersonAdd = {
      name: this.personsForm.value.name,
      firstLastName: this.personsForm.value.firstLastName,
      secondLastName: this.personsForm.value.secondLastName,
      documentIdentity: arrayDocument
    }
    this.$subscription=this.personService.insertPerson(newPerson).subscribe(data=>{
      if (data.status==200)
        this.openMessageBox(Buttons.Ok,'Information','fdfdf');
    })
    this.personsForm.reset();
  }

  test(): void {

  }
  ngOnDestroy(): void {
     //this.$subscription.unsubscribe();
  }
  openMessageBox(buttons: Buttons,title:string,message:string) {
    let dialog = this.mb.show(message,title,buttons);

    dialog.dialogResult$.subscribe(result=>{
      console.log("Button pressed: ", Button[result])
    });

  }

}
