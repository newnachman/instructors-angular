import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { InstructorService } from '../instructor.service';
import { IInstructor } from '../blueprints/instructor-blueprint';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})

export class AdminDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private instructorService: InstructorService
  ) { }

  instructor: IInstructor;  
  errorMessage: string;
  message: string;
  aprvStatusMsg: string;
  aprvStatus: boolean;
  checked: string;
  
  ngOnInit(): void {
    let id = this.data.id;
    let key = localStorage.getItem('authKey');
    this.instructorService.getOneInstructor(id, key).subscribe({
      next: instructor => {
          this.instructor = instructor;
          this.aprvStatus = this.instructor.instStatus == "approved" ? true : false ;
          this.checked = this.aprvStatus ? "checked" : "" ;

      },
      error: (err: string) => console.log(err) 
    }) 
  }

  update() {
    let data = {
      instId:           this.instructor['instId'],
      instName:         this.instructor['instName'],
      instField:        this.instructor['instField'],
      instTitle:        this.instructor['instTitle'],
      instEmail:        this.instructor['instEmail'],
      instPhone:        this.instructor['instPhone'],
      instLink:         this.instructor['instLink'],
      instDiploma:      this.instructor['instDiploma'],
      instStatus:       this.instructor['instStatus'],
      instDescription:  this.instructor['instDescription'],
      instImage:        this.instructor['instImage'],
      authKey:          localStorage.getItem('authKey')
    }

    let mode = "update";
    this.instructorService.updateInstructor(data, mode).subscribe({
      next: res => {
          this.message = res;
          console.log(res);
      },
      error: (err: string) => {
        this.errorMessage = err;
        console.log(this.errorMessage);
      }
    }) 
  }

  toggleApprove(event) {
    if (event.target.checked) {
      this.aprvStatus = true;
      this.aprvStatusMsg = "instructor approved!";
    } else {
      this.aprvStatus = false;
      this.aprvStatusMsg = "instructor is not approved!";
    }

    let data = {
      instId:           this.instructor['instId'],
      authKey:          localStorage.getItem('authKey'),
      isApprove:        this.aprvStatus
    }

    let mode = "toggleApprove";
    this.instructorService.updateInstructor(data, mode).subscribe({
      next: res => {
          this.message = res;
          console.log(res);
      },
      error: (err: string) => {
        this.errorMessage = err;
        console.log(this.errorMessage);
      }
    }) 
  }

  close() {
    this.dialogRef.close('<close presed>');
  }

}
