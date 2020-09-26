import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { IInstructorShort } from './blueprints/instructor-blueprint-short';
import { InstructorService } from './instructor.service';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';


@Component({
  selector: 'app-instructor-admin',
  templateUrl: './instructor-admin.component.html',
  styleUrls: ['./instructor-admin.component.css']
})

export class InstructorAdminComponent implements OnInit {

  errorMessage: string;
  instructors: IInstructorShort[];
  filteredInstructors: IInstructorShort[];
  _valueFilterField: string;
  _valueFilterMail: string;
  isApprovedFirst: boolean = false;

  constructor(private instructorService: InstructorService, public dialog: MatDialog) { }

  get valueFilterField(): string {
    return this._valueFilterField;
  }
  set valueFilterField(value:string) {
      this._valueFilterField = value;
      this.filteredInstructors = this.valueFilterField ? this.performFilter("instField", this.valueFilterField) : this.instructors;
  }
  get valueFilterMail(): string {
    return this._valueFilterMail;
  }
  set valueFilterMail(value:string) {
      this._valueFilterMail = value;
      this.filteredInstructors = this.valueFilterMail ? this.performFilter("instEmail", this.valueFilterMail) : this.instructors;
  }
  
  performFilter(filterBy: string, filterValue: string): IInstructorShort[]{
    filterValue = filterValue.toLocaleLowerCase();
    if (filterBy === "instField") {
      return this.instructors.filter((instructors: IInstructorShort) => 
      instructors.instField.toLocaleLowerCase().indexOf(filterValue) !== -1)
    } else if (filterBy === "instEmail") {
      return this.instructors.filter((instructors: IInstructorShort) => 
      instructors.instEmail.toLocaleLowerCase().indexOf(filterValue) !== -1)
    }
   
  }
  
  ngOnInit(): void { 
    this.getInstructors()
  }

  getInstructors() {
    let status = localStorage.getItem('authStatus');
    if(status == 'true') {
      let key = localStorage.getItem('authKey');
      this.instructorService.getInstructors(key).subscribe({
        next: instructors => {
            this.instructors = instructors;
            // The <template> uses the 'filtered' instructors-list variable
            // to show the instructors. so lets put the data inside it: 
            this.filteredInstructors = this.instructors;
            this.notApprovedFirst();
        },
        error: (err: string) => this.errorMessage = err
      }) 
    } else {
      this.errorMessage = "Authorization problem";
    }
  }

  notApprovedFirst() {
    this.isApprovedFirst = false;
    this.sortInstructors("notApprovedFirst");
  }
  
  approvedFirst() {
    this.isApprovedFirst = true;
    this.sortInstructors("approvedFirst");
  }

  sortInstructors(mode: string){
    if (mode === "notApprovedFirst") {
      this.filteredInstructors.sort(function(a, b){
        let x = a.instStatus;
        let y = b.instStatus;
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
      });
    } else if (mode === "approvedFirst") {
      this.filteredInstructors.sort(function(a, b){
        let x = a.instStatus;
        let y = b.instStatus;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
    }
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      width: '85%',
      height: '85%',
      data: {
        id: id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getInstructors();
    });
  }

}
    


