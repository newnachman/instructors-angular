import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
 
  constructor(private instructorService: InstructorService, public dialog: MatDialog) { }

  ngOnInit(): void { 
    let status = localStorage.getItem('authStatus');
    if(status == 'true') {
      let key = localStorage.getItem('authKey');
      this.instructorService.getInstructors(key).subscribe({
        next: instructors => {
            this.instructors = instructors;
        },
        error: (err: string) => this.errorMessage = err
      }) 
    } else {
      this.errorMessage = "Authorization problem";
    }
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      width: '75%',
      height: '75%',
      data: {
        id: id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed. result is: [ ${result} ] `);
    });
  }

}
    


