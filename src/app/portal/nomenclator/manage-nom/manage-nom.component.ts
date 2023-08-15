import { Component, OnInit } from '@angular/core';
import nomConfig from '../config/config.json';
import {ConfigStructure} from "../service/data/nomenclator-data";
@Component({
  selector: 'app-manage-nom',
  templateUrl: './manage-nom.component.html'
})
export class ManageNomComponent implements OnInit {
  config:ConfigStructure;
  constructor() {
    this.config= nomConfig as ConfigStructure;
  }
  ngOnInit(): void {
  }



}
