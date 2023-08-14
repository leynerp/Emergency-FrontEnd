import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MessageBox} from "../../../@shared/components/message-box/menssague-box-provider";
import {Nomenclator, NomenclatorData, NomenclatorsType} from "../service/data/nomenclator-data";
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormNomenclatorComponent} from "../principal/form-nomenclator.component";
import {Button, Buttons, MessageType} from "../../../@shared/components/common";
import {NomenclatorService} from "../service/nomenclator.service";

@Component({
  selector: 'app-list-nomenclator',
  templateUrl: './list-nomenclator.component.html',
  styleUrls: ['../../../@shared/styles/listComponent.scss','./list-nomenclator.component.scss'],
  providers:[{provide: NomenclatorData, useClass:NomenclatorService}]
})
export class ListNomenclatorComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'active','end'];
  dataSource: MatTableDataSource<Nomenclator>;
  isLoadingResults = true;
  isRateLimitReached = false;
  enableButton: boolean = true;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tableTitle!: String;
  clickedRows = new Set<Nomenclator>();
  @Input() name!: String;
  @Input() icon!: String;
  @Input() reference!: NomenclatorsType;
  nomenclatorSubcription!:Subscription;
  constructor(private dialog: MatDialog,private nomenclatorService: NomenclatorData, private message: MessageBox) {

    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.filterPredicate = (data: Nomenclator, filter: string) => {
      return data.name.toLowerCase().indexOf(filter) != -1;
    };
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(data => {
      this.findData(data.pageIndex, data.pageSize);
    })
  }

  ngOnInit(): void {
    this.nomenclatorService.setReference(this.reference);
    this.findData(0, 10);

  }

  openAddWindows(opt: string,row?:Nomenclator) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.id = 'nomenclatorDialog';
    const data={
      reference:this.reference,
      selectedRow:(row) ? row : Array.from(this.clickedRows.values()).reduce((acc, item) => {
      return item;
    }, {}),
      opt:opt,
      objService:this.nomenclatorService
    };
    dialogConfig.data=data;
    this.dialog.open(FormNomenclatorComponent, dialogConfig);
    this.dialog.getDialogById('nomenclatorDialog')?.componentInstance.$action.subscribe(()=>this.findData());
  }

  findData(start: number = 0, limit: number = 10) {
    this.nomenclatorSubcription = this.nomenclatorService.getData(start,limit).subscribe({
      next: (data) => {
        this.dataSource =new MatTableDataSource(data.data);
        this.paginator.length = data.total_count;
        this.isLoadingResults = false;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })

  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}ending`);
    } else {
      console.log('Sorting cleared');
    }
  }
  selectRow(row: Nomenclator): void {
    if (this.clickedRows.has(row))
      this.clickedRows.delete(row)
    else
      this.clickedRows.add(row)
    this.enableButton = (this.clickedRows.size == 1) ? false : true;
  }

  deleteNomenclator(row:Nomenclator) {
    let dialog = this.message.show('Are you sure that want to delete the selected item?', 'Delete Item', Buttons.YesNo, MessageType.Question);
    this.isLoadingResults = false;
    dialog.dialogResult$.subscribe(button=>{
       if (button==Button.Yes){
         this.isLoadingResults = true;
         this.nomenclatorService.deleteData(row.id).subscribe({
           next:(data)=>{
              const {message}=data;
              this.message.show(message,'Information',Buttons.Ok);
              this.isLoadingResults=false;
              this.findData();
           },
           error: ({error}) => this.message.show(error.error, error.message, Buttons.Ok, MessageType.Error)
         })
       }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
