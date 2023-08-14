import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Nomenclator, NomenclatorData, NomenclatorsType} from "../service/data/nomenclator-data";
import {MessageBox} from "../../../@shared/components/message-box/menssague-box-provider";
import {Observable, Subject} from "rxjs";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Buttons, MessageFormat} from "../../../@shared/components/common";

@Component({
  selector: 'app-principal',
  templateUrl: './form-nomenclator.component.html',
  styleUrls: ['./form-nomenclator.component.scss']
})
export class FormNomenclatorComponent implements OnInit {
  nomenclatorForm!: FormGroup;
  title: String = "Add new element";
  option!: String;
  rowSelect:Nomenclator;
  nomenclatorType!:NomenclatorsType;
  $action: Subject<String> = new Subject<String>();
  objService:NomenclatorData;
  constructor(private fNomenclatorBuilder: FormBuilder,private mb: MessageBox,@Inject(MAT_DIALOG_DATA) data: any) {
    this.option=data.opt;
    this.objService=data.objService;
    this.rowSelect=(data.selectedRow)? data.selectedRow : {id:0,denomination:'',description:'',active:0};
    this.nomenclatorType=data.reference;
  }

  ngOnInit(): void {
    this.nomenclatorForm=this.fNomenclatorBuilder.group({
      id:[this.rowSelect.id],
      name:[this.rowSelect.name,[Validators.required, Validators.minLength(3), Validators.pattern("^([a-zA-ZáéíóúñÑ ]+ ?[a-zA-ZáéíóúñÑ ]*)+[^;]*$")]],
      description:[this.rowSelect.description],
      active:[this.rowSelect.active]
    });
  }

  saveNomenclator() {
     const nomenclatorData:Nomenclator=this.nomenclatorForm.value;
     const $nomenclatorOb:Observable<MessageFormat>=(this.option==='add') ? this.objService.insertData(nomenclatorData) : this.objService.updateData(nomenclatorData);
     $nomenclatorOb.subscribe({
       next:(data)=>{
          const {message}=data;
          const messageDialog=this.mb.show(message,'Information',Buttons.Ok);
          this.$action.next('reload');
       },
       error:({error})=>{
         const messageDialog=this.mb.show(error.message,'Error',Buttons.Ok);
       }
     })
  }
}
