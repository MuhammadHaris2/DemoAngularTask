import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import {debounceTime,distinctUntilChanged, map} from 'rxjs/operators'
import { DashboardService, User } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  familyList: any[] = []
  dialogRef: any;
  editRowName: any;
  editRowIndex: any;
  title:any="";
  tab:any
  viewRowData: any;
  isAdmin:boolean=false

  @ViewChild('inputSearch')
  inputSearch!: ElementRef;
  forLocalSearch: any[]=[];
  constructor(public router: Router, public _dashboard: DashboardService, private matDialog: MatDialog,private _snackBar: MatSnackBar) { 
    const userObj = this._dashboard.getLocalStorage('login');
    if(userObj){
      const user = JSON.parse(userObj);
      this.isAdmin = (user.role == User.Admin)
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  getFamilyData() {
    this.familyList = this._dashboard.getFamily();
    this.forLocalSearch= [...this.familyList]
    // console.log(this.familyList)
  }
  deleteData(index: any) {
    this._dashboard.deleteFamilyData(index, this.familyList)
  }
  openModel(ref: any, row: any, index: any,title:any,tab:any) {
    this.title = title;
    this.tab = tab
    this.viewRowData = row
    this.editRowName = row.name;
    this.editRowIndex = index;
    this.dialogOpen(ref)
  }
  edit(){
    if(!this.editRowName){
      return this.openSnackBar('Name is Required','OK') 
    }
    this.familyList[this.editRowIndex]["name"]=this.editRowName;
    // this.forLocalSearch= [...this.familyList]
    this.closeDialog()
  }
  dialogOpen(tempRef: TemplateRef<any>) {
    this.dialogRef = tempRef
    this.matDialog.open(this.dialogRef)
  }
  closeDialog() {
    this.matDialog.closeAll();
  }
  localSearch(searchBy:string,searchValue:any,searchArray:any[]){
    this.familyList = this._dashboard.SearchBySpecificKeyInData(searchBy,searchValue,searchArray)
    if(!searchValue){
      this.familyList = [...this.forLocalSearch]
    }
  }
  ngOnInit(): void {
    this.getFamilyData()
  }
  ngAfterViewInit() {
    fromEvent(this.inputSearch.nativeElement,'keyup').pipe(
      map((ev:any)=>{
        return ev.target.value;
      }),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((text:any)=>{
        this.localSearch('name',text,this.forLocalSearch);
    })
    
  }

}
