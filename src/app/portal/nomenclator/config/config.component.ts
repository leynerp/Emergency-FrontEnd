import { Component, OnInit } from '@angular/core';
import {NomenclatorService} from "../service/nomenclator.service";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  constructor(private _httpClient: NomenclatorService) { }

  ngOnInit(): void {
  }



}
