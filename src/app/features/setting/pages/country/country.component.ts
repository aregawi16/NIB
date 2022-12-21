import { ConfirmDialogComponent } from './../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { SettingService } from '../../setting.service';
import { MatTableDataSource } from '@angular/material/table';

export interface Country {
  countryId: number;
  name: string;
  code: string;
  continent: Continent;
  passportActivePeriod: string;
}
export enum Continent {
       Europe=1,
        NorthAmerica,
        SouthAmerica,
        Asia,
        Australia,
        Africa,
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent {
  displayedColumns: string[] = ['id','code', 'name', 'continent','passportActivePeriod','action'];
  dataSource = new MatTableDataSource<any>();
 countrys!:Country[];
 isLoading = true;
 continents!:number[];
 continentList=Continent;
 horizontalPosition: MatSnackBarHorizontalPosition = 'start';
 verticalPosition: MatSnackBarVerticalPosition = 'bottom';
 pageNumber: number = 1;
   CountryForm!: FormGroup;
   isEditableNew: boolean = true;
   constructor(
     private fb: FormBuilder,
     public dialog: MatDialog,
     private _snackBar: MatSnackBar,
     private _settingService: SettingService,
     private _formBuilder: FormBuilder){
      this.continents= Object.keys(this.continentList).map(key => parseInt(key)).filter(f => !isNaN(Number(f)));

 }


   ngOnInit(): void {
     this.CountryForm = this._formBuilder.group({
       CountryFormRows: this._formBuilder.array([])
     });
     this._settingService.getCountrys()
     .subscribe(data => {
       this.countrys = data;
       this.CountryForm = this.fb.group({
         CountryFormRows: this.fb.array(this.countrys.map(val => this.fb.group({
           id: new FormControl(val.countryId),
           code: new FormControl(val.code),
           name: new FormControl(val.name),
           continent: new FormControl(val.continent),
           passportActivePeriod: new FormControl(val.passportActivePeriod),
           action: new FormControl('existingRecord'),
           isEditable: new FormControl(true),
           isNewRow: new FormControl(false),
         })
         )) //end of fb array
       }); // end of form group cretation
 this.isLoading = false;
 this.dataSource = new MatTableDataSource((this.CountryForm.get('CountryFormRows') as FormArray).controls);
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
     const control = this.CountryForm.get('CountryFormRows') as FormArray;
     control.insert(0,this.initiateCountryForm());
     this.dataSource = new MatTableDataSource(control.controls)
     // control.controls.unshift(this.initiateCountryForm());
     // this.openPanel(panel);
       // this.table.renderRows();
       // this.dataSource.data = this.dataSource.data;
   }

   // this function will enabled the select field for editd
   EditCountryForm(CountryFormElement, i) {

     // CountryFormElement.get('CountryFormRows').at(i).get('name').disabled(false)
     CountryFormElement.get('CountryFormRows').at(i).get('isEditable').patchValue(false);
     // this.isEditableNew = true;

   }

   // On click of correct button in table (after click on edit) this method will call
   SaveCountryForm(CountryFormElement, i) {

     this._settingService.createCountry(CountryFormElement.get('CountryFormRows').at(i).value)
     .subscribe(data => {
       CountryFormElement.get('CountryFormRows').at(i).controls.id.setValue(data.countryId);

       console.log(data);
       CountryFormElement.get('CountryFormRows').at(i).get('isEditable').patchValue(true);

           this._snackBar.open('Job added successfully', 'Undo', {
             duration:10000,
             horizontalPosition: this.horizontalPosition,
             verticalPosition: this.verticalPosition,
           });


     });
   }

   deleteJob(CountryFormElement, i) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       maxWidth: "400px",
       data: {
         title: "Confirm Action",
         message: "Are you sure you want remove this job?"
       }
     });
     dialogRef.afterClosed().subscribe(dialogResult => {
       if(dialogResult){
         this._settingService.deleteCountry(CountryFormElement.get('CountryFormRows').at(i).controls.id.value)
         .subscribe( ()=> {
           console.log(this.countrys );
           const index: number = this.countrys.findIndex(x => x.countryId == CountryFormElement.get('CountryFormRows').at(i).controls.id.value);
           if (index !== -1) {
             this.countrys =   this.countrys.splice(index, 1);
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
   CancelCountryForm(CountryFormElement, i) {
     CountryFormElement.get('CountryFormRows').at(i).get('isEditable').patchValue(true);
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


   initiateCountryForm(): FormGroup {
     return this.fb.group({

      id: new FormControl(121),
                 code: new FormControl(''),
                 name: new FormControl(''),
                 continent: new FormControl(0),
                 passportActivePeriod: new FormControl(0),
                 action: new FormControl('newRecord'),
                 isEditable: new FormControl(false),
                 isNewRow: new FormControl(true),
     });
   }

 public getCountryList()
 {

   this._settingService.getCountrys()
     .subscribe(data => {
       this.countrys = data;
     });
 }
}
