import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Agent, Doctor, Person, PersonAdd, PersonData, PersonsType, Shipper} from "../service/data/persons";
import {MatSort, Sort} from "@angular/material/sort";
import {ActivatedRoute} from "@angular/router";
import {AppPersonDialog} from "../form-person/dialog-persons-component";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {Button, Buttons, MessageType} from "../../../@shared/components/common";
import {MessageBox} from "../../../@shared/components/message-box/menssague-box-provider";

@Component({
  selector: 'persons-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['idPerson', 'name', 'flastname', 'secLastname', 'noIdentification', 'medicalRegistry', 'registry', 'identificationNumber', 'star'];
  dataSource: MatTableDataSource<Person>;
  @Input() typePerson!: PersonsType;
  enumPerson=PersonsType;
  @ViewChild("formPersonComponent") formPersonComponent!: AppPersonDialog;
  data: Person[] = [];
  isLoadingResults = true;
  isRateLimitReached = false;
  clickedRows = new Set<Person>();
  enableButton: boolean = true;
  personSubscription!: Subscription;
  deleteSubscription!: Subscription;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tableTitle: any;
  constructor(private personService: PersonData, private message: MessageBox, private activatedRoute: ActivatedRoute) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(data => {
      this.findPersonData(data.pageIndex, data.pageSize);
    })
  }

  ngOnDestroy(): void {
    this.personSubscription.unsubscribe();
  }

  ngOnInit() {
    this.tableTitle = this.getTitle();
    this.findPersonData(0, 10);
  }

  getTitle(): string {
    if (this.typePerson == PersonsType.Doctor)
      return 'Doctor list';
    return (this.typePerson == PersonsType.Shipper) ? 'Shipper list' : 'Agent list';
  }

  findData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}ending`);
    } else {
      console.log('Sorting cleared');
    }
  }

  openAddWindows(opt: String, row?: any) {
    this.formPersonComponent.openDialog(row,this.typePerson);

  }

  findPersonData(start: number = 0, limit: number = 10) {
    this.personSubscription = this.personService.getPersons(start, limit, this.typePerson).subscribe({
      next: (data) => {
        this.dataSource =new MatTableDataSource(data.data);
        this.paginator.length = data.total_count;
        this.isLoadingResults = false;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })

  }


  selectRow(row: Person): void {
    if (this.clickedRows.has(row))
      this.clickedRows.delete(row)
    else
      this.clickedRows.add(row)
    this.enableButton = (this.clickedRows.size == 1) ? false : true;
  }

  deletePerson(deletePerson: Person) {
    let dialog = this.message.show('Are you sure that want to delete the selected person?', 'Delete Person', Buttons.YesNo, MessageType.Question);
    this.isLoadingResults = false;
    dialog.dialogResult$.subscribe(result => {
      if (result == Button.Yes) {
        this.isLoadingResults = true;
        this.deleteSubscription = this.personService.deletePerson(deletePerson.id_person,this.typePerson).subscribe({
          next: (data) => {
            if (data.status == 200) {
              let dialog = this.message.show(data.message, 'Information', Buttons.Ok);
              this.isLoadingResults = false;
              dialog.dialogResult$.subscribe(result => {
                this.findPersonData();
                this.clickedRows.delete(deletePerson)
              });
            } else
              this.message.show('Has been error!!!', 'Error', Buttons.Ok);
          }
        });
      }

    });
    /**/
  }
}
