import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Nomenclator} from "../../nomenclator/service/data/nomenclator-data";
import {ActivatedRoute} from "@angular/router";
import {FormPersonComponent} from "./form-person.component";
import {PersonsType} from "../service/data/persons";


@Component({
  selector: 'app-person-dialog',
  template: ``,
  styleUrls: ['./form-person.component.scss']
})
export class AppPersonDialog implements OnInit, OnDestroy {
  documentType!: Nomenclator[];
  constructor(private dialog: MatDialog,private activatedRoute:ActivatedRoute) {}

  openDialog(opt:String,row:any,type:PersonsType) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.id = 'personDialog';
    let data={
      documentType:this.documentType,
      personSelected:row,
      type:type,
      opt:opt
    };
    dialogConfig.data=data;
    this.dialog.open(FormPersonComponent, dialogConfig);
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.documentType=<Nomenclator[]>data['documentType']['data'];
    });
  }
  ngOnDestroy(): void {

  }
  getComponentInDialog():any{
    return  this.dialog.getDialogById('personDialog')?.componentInstance;
  }


}

