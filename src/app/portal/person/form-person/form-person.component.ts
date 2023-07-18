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
import {Subject, Subscription} from "rxjs";
import {MessageBox} from "../../../@shared/components/message-box/menssague-box-provider";
import {Button, Buttons, MessageType} from "../../../@shared/components/common";

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.scss']
})
export class FormPersonComponent implements OnInit, OnChanges, OnDestroy {
  personsForm!: FormGroup;
  @Output() personAddEvent=new EventEmitter();
  @ViewChild('formPerson') formPerson: any;
  title: String = "Add persons";
  documentType: Nomenclator[];
  genericField:any;
  personsType:PersonsType;
  rowSelect:any={id_person:'',name:'',registry:'',f_last_name:'',s_last_name:'',no_identification:'',id_document_type:''};
  $subscription!: Subscription;
  $accion!:Subject<String>;
  constructor(private fPersonBuilder: FormBuilder,private mb:MessageBox,private personService:PersonData, private dialogRef: MatDialogRef<FormPersonComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.documentType = data.documentType;
    this.personsType=data.type;
    if (data.personSelected){
      this.rowSelect=data.personSelected;
      this.title='Update person';
    }
    this.genericField=this.createObjectGenericField();
  };
  createObjectGenericField():Object{
    if(this.personsType===PersonsType.Shipper) return {title:'Registry number',placeHolder:'Registry number',value:(this.rowSelect.registry)?this.rowSelect.registry:''}
    return (this.personsType===PersonsType.Doctor) ? {title:'Doctor Registry',placeHolder:'Doctor Registry',value:(this.rowSelect.medical_registry)?this.rowSelect.medical_registry:''}:{title:'Agent Number',placeHolder:'Agent Number',value:(this.rowSelect.agent_number)?this.rowSelect.agent_number:''}
  }
  getObjectByType(obj:PersonAdd):PersonAdd {
    let objField={};
     if(this.personsType===PersonsType.Shipper) {
        objField={registry:this.personsForm.controls['genericField'].value};
     }else
       objField=(this.personsType===PersonsType.Doctor)?{medical_registry:this.personsForm.controls['genericField'].value} :{agent_number:this.personsForm.controls['genericField'].value};

    return {...obj,...objField} as PersonAdd;

  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.personsForm = this.initForm();
  }

  initForm(): FormGroup {

    return this.personsForm = this.fPersonBuilder.group({
      name: [this.rowSelect.name,[Validators.required, Validators.minLength(3), Validators.pattern("^([a-zA-ZáéíóúñÑ ]+ ?[a-zA-ZáéíóúñÑ ]*)+[^;]*$")]],
      id_person: [this.rowSelect.id_person,[ Validators.minLength(3)]],
      f_last_name: [this.rowSelect.f_last_name,[Validators.required, Validators.minLength(3)]],
      s_last_name: [this.rowSelect.s_last_name,[Validators.required, Validators.minLength(3)]],
      no_identification: [this.rowSelect.no_identification, [Validators.required]],
      id_document_type: [this.rowSelect.id_document_type, [Validators.required]],
      genericField: [this.genericField.value, [Validators.required]]
    });

  }

  savePerson(closeWindows: boolean): void {
    const auxPerson={...this.personsForm.value};
    delete auxPerson.genericField;
    const personAdd:PersonAdd=this.getObjectByType(auxPerson);
    this.$subscription=this.personService.insertPerson(personAdd,this.personsType).subscribe({
      next:(data)=>{
        this.mb.show(data.message,'Information');
        this.personAddEvent.emit();
      },
      error:(data)=>this.mb.show(data.error.error,data.error.message,undefined,MessageType.Error)
    })
    this.personsForm.reset();
  }

  closeWindows(): String {
     return this.genericField.title;
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
  getGenericTittle():String {
    return this.genericField.title;
  }

  getGenericPlaceholder() {
    return this.genericField.placeHolder;
  }
}
