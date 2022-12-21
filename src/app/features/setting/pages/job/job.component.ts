import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './../../../../shared/components/confirm-dialog/confirm-dialog.component';

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { startWith, tap } from 'rxjs/operators';
import { SettingService } from '../../setting.service';

export interface CommonJob {
  commonJobId: number;
  name: string;
  code: string;
  description: string;
}


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class JobComponent implements OnInit{
  displayedColumns: string[] = ['id','code', 'name', 'description','action'];
 dataSource = new MatTableDataSource<any>();
commonJobs!:CommonJob[];
isLoading = true;
horizontalPosition: MatSnackBarHorizontalPosition = 'start';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';
pageNumber: number = 1;
  VOForm!: FormGroup;
  isEditableNew: boolean = true;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _settingService: SettingService,
    private _formBuilder: FormBuilder){
}


  ngOnInit(): void {
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });
    this._settingService.getCommonJobList()
    .subscribe(data => {
      this.commonJobs = data;
      this.VOForm = this.fb.group({
        VORows: this.fb.array(this.commonJobs.map(val => this.fb.group({
          id: new FormControl(val.commonJobId),
          code: new FormControl(val.code),
          name: new FormControl(val.name),
          description: new FormControl(val.description),
          action: new FormControl('existingRecord'),
          isEditable: new FormControl(true),
          isNewRow: new FormControl(false),
        })
        )) //end of fb array
      }); // end of form group cretation
this.isLoading = false;
this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
this.dataSource.paginator = this.paginator;

const filterPredicate = this.dataSource.filterPredicate;
  this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
    return filterPredicate.call(this.dataSource, data.value, filter);
  }

  //Custom filter according to name column
    });


    // this.dataSource.filterPredicate = (data: {name: string}, filterValue: string) =>
    //   data.name.trim().toLowerCase().indexOf(filterValue) !== -1;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

goToPage() {
    this.paginator.pageIndex = this.pageNumber - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginatorList = document.getElementsByClassName('mat-paginator-range-label');

   this.onPaginateChange(this.paginator, this.paginatorList);

   this.paginator.page.subscribe(() => { // this is page change event
     this.onPaginateChange(this.paginator, this.paginatorList);
   });
  }

   applyFilter(event: Event) {
    //  debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // @ViewChild('table') table: MatTable<PeriodicElement>;
  AddNewRow() {
    // this.getBasicDetails();
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0,this.initiateVOForm());
    this.dataSource = new MatTableDataSource(control.controls)
    // control.controls.unshift(this.initiateVOForm());
    // this.openPanel(panel);
      // this.table.renderRows();
      // this.dataSource.data = this.dataSource.data;
  }

  // this function will enabled the select field for editd
  EditSVO(VOFormElement, i) {

    // VOFormElement.get('VORows').at(i).get('name').disabled(false)
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
    // this.isEditableNew = true;

  }

  // On click of correct button in table (after click on edit) this method will call
  SaveVO(VOFormElement, i) {

    this._settingService.createCommonJob(VOFormElement.get('VORows').at(i).value)
    .subscribe(data => {
      VOFormElement.get('VORows').at(i).controls.id.setValue(data.commonJobId);

      console.log(data);
      VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);

          this._snackBar.open('Job added successfully', 'Undo', {
            duration:10000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });


    });
  }

  deleteJob(VOFormElement, i) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want remove this job?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this._settingService.deleteCommonJob(VOFormElement.get('VORows').at(i).controls.id.value)
        .subscribe( ()=> {
          console.log(this.commonJobs );
          const index: number = this.commonJobs.findIndex(x => x.commonJobId == VOFormElement.get('VORows').at(i).controls.id.value);
          if (index !== -1) {
            this.commonJobs =   this.commonJobs.splice(index, 1);
            this._snackBar.open('Job delted successfully', 'Undo', {
              duration:10000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          this.ngOnInit();
        });

      }
    });

  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  CancelSVO(VOFormElement, i) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }


paginatorList!: HTMLCollectionOf<Element>;
idx!: number;
onPaginateChange(paginator: MatPaginator, list: HTMLCollectionOf<Element>) {
     setTimeout((idx) => {
         let from = (paginator.pageSize * paginator.pageIndex) + 1;

         let to = (paginator.length < paginator.pageSize * (paginator.pageIndex + 1))
             ? paginator.length
             : paginator.pageSize * (paginator.pageIndex + 1);

         let toFrom = (paginator.length == 0) ? 0 : `${from} - ${to}`;
         let pageNumber = (paginator.length == 0) ? `0 of 0` : `${paginator.pageIndex + 1} of ${paginator.getNumberOfPages()}`;
         let rows = `Page ${pageNumber} (${toFrom} of ${paginator.length})`;

         if (list.length >= 1)
             list[0].innerHTML = rows;

     }, 0, paginator.pageIndex);
}


  initiateVOForm(): FormGroup {
    return this.fb.group({

     id: new FormControl(121),
                code: new FormControl(''),
                name: new FormControl(''),
                description: new FormControl(''),
                action: new FormControl('newRecord'),
                isEditable: new FormControl(false),
                isNewRow: new FormControl(true),
    });
  }

  public getCommonJobList()
{

  this._settingService.getCommonJobList()
    .subscribe(data => {
      this.commonJobs = data;
    });
}

}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
