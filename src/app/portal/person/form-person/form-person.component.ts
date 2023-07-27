import {
  Component,
  EventEmitter,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PersonAdd, PersonData, PersonsType, Shipper} from "../service/data/persons";
import {Nomenclator} from "../../nomenclator/service/data/nomenclator-data";
import {Observable, Subject, Subscription} from "rxjs";
import {MessageBox} from "../../../@shared/components/message-box/menssague-box-provider";
import {Button, Buttons, MessageFormat, MessageType} from "../../../@shared/components/common";

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.scss']
})
export class FormPersonComponent implements OnInit, OnDestroy {
  personsForm!: FormGroup;
  @Output() personAddEvent = new EventEmitter();
  @ViewChild('formPerson') formPerson: any;
  title: String = "Add persons";
  documentType: Nomenclator[];
  genericField: any;
  option!: String;
  personsType: PersonsType;
  rowSelect: any = {
    id_person: '',
    name: '',
    registry: '',
    f_last_name: '',
    s_last_name: '',
    no_identification: '',
    id_document_type: ''
  };
  $subscription!: Subscription;
  $action: Subject<String> = new Subject<String>();
  constructor(private fPersonBuilder: FormBuilder, private mb: MessageBox, private personService: PersonData, private dialogRef: MatDialogRef<FormPersonComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.documentType = data.documentType;
    this.personsType = data.type;
    this.option = data.opt;
    if (data.personSelected) {
      this.rowSelect = data.personSelected;
      this.title = 'Update person';
    }
    this.genericField = this.createObjectGenericField();
  };

  createObjectGenericField(): Object {
    const title = this.personsType === PersonsType.Shipper ? 'Registry number' :
      this.personsType === PersonsType.Doctor ? 'Doctor Registry' :
        'Agent Number';

    const placeHolder = this.personsType === PersonsType.Shipper ? 'Registry number' :
      this.personsType === PersonsType.Doctor ? 'Doctor Registry' :
        'Agent Number';

    const value = this.personsType === PersonsType.Shipper ? (this.rowSelect.registry ? this.rowSelect.registry : '') :
      this.personsType === PersonsType.Doctor ? (this.rowSelect.medical_registry ? this.rowSelect.medical_registry : '') :
        (this.rowSelect.agent_number ? this.rowSelect.agent_number : '');

    return { title, placeHolder, value };
  }

  getObjectByType(): PersonAdd {
    const auxPerson = {...this.personsForm.value};
    delete auxPerson.genericField;
    const objField = this.personsType === PersonsType.Shipper
      ? {registry: this.personsForm.controls['genericField'].value}
      : this.personsType === PersonsType.Doctor
        ? {medical_registry: this.personsForm.controls['genericField'].value}
        : {agent_number: this.personsForm.controls['genericField'].value};
    return {...auxPerson, ...objField} as PersonAdd;
  }

  ngOnInit(): void {
    this.personsForm = this.initForm();
  }

  initForm(): FormGroup {

    return this.personsForm = this.fPersonBuilder.group({
      name: [this.rowSelect.name, [Validators.required, Validators.minLength(3), Validators.pattern("^([a-zA-ZáéíóúñÑ ]+ ?[a-zA-ZáéíóúñÑ ]*)+[^;]*$")]],
      id_person: [this.rowSelect.id_person, [Validators.minLength(3)]],
      f_last_name: [this.rowSelect.f_last_name, [Validators.required, Validators.minLength(3)]],
      s_last_name: [this.rowSelect.s_last_name, [Validators.required, Validators.minLength(3)]],
      no_identification: [this.rowSelect.no_identification, [Validators.required]],
      id_document_type: [this.rowSelect.id_document_type, [Validators.required]],
      genericField: [this.genericField.value, [Validators.required]]
    });

  }

  savePerson(closeWindows: boolean): void {
    const personAdd: PersonAdd = this.getObjectByType();
    const observablePerson:Observable<MessageFormat>=(this.option==='add') ?this.personService.insertPerson(personAdd, this.personsType)
                                                :this.personService.updatePerson(personAdd, this.personsType,this.personsForm.controls['id_person'].value);
    this.$subscription = observablePerson.subscribe({
      next: data => {
        const {message} = data;
        this.mb.show(message, 'Information');
        this.personAddEvent.emit();
        this.$action.next('reload');
      },
      error: ({error}) => this.mb.show(error.error, error.message, undefined, MessageType.Error)
    })
    this.personsForm.reset();
  }

  closeWindows(): String {
    return this.genericField.title;
  }

  ngOnDestroy(): void {
  // this.$subscription.unsubscribe();
  }

  getGenericTittle(): String {
    return this.genericField.title;
  }

  getGenericPlaceholder() {
    return this.genericField.placeHolder;
  }
}
