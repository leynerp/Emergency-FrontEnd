import {Component, OnInit} from '@angular/core';
import {PersonsType} from "../service/data/persons";

@Component({
  selector: 'app-manage-nom',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
    /*private types:Object = Object.freeze({
    agent: Symbol(),
    shipper: Symbol(),
    doctor: Symbol(),
  });*/
  personType=PersonsType;
  constructor() { }

  ngOnInit(): void {

  }

  getPersonType(type:String) {

    return undefined;
  }
}
