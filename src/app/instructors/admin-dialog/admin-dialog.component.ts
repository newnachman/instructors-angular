import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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

  // img properties:
  imgStatusMsg: string;
  imgName: string = "";
  goPickImg = true;
  imgLoad = false;
  imgLoadStep = false;
  replaceImgBtn = false;
  inputImg: HTMLInputElement;
  
  onInputImg(e: Event) {
    this.inputImg = e.target as HTMLInputElement;
    this.imgName = this.inputImg.files[0].name;
    this.goPickImg = false;
  }
 
  uploadImg() {
    this.imgStatusMsg = "Uploading your image ..."
    this.imgLoad = true;
    this.imgLoadStep = true;
    this.instructorService.createImg(this.inputImg.files[0])
    .subscribe(
      (data) => {
        this.instructor.instImage = data['url'] ;
        console.log("new image has been uploaded: " + this.instructor['instImage']);
        let kb = (data['size'] * 0.0009765625).toFixed(2);
        console.log("size: " + kb + " KB.");
        // change UI messages
        this.imgStatusMsg = "Image uploaded."
      });
  }
  
  ngOnInit(): void {
    let id = this.data.id;
    let key = localStorage.getItem('authKey');
    this.instructorService.getOneInstructor(id, key).subscribe({
      next: instructor => {
          this.instructor = instructor;
          this.aprvStatus = this.instructor.instStatus == "approved" ? true : false ;
          this.aprvStatusMsg = this.aprvStatus ? "Approved." : "Not approved." ;
          this.checked = this.aprvStatus ? "checked" : "" ;
          console.log("int image: " + this.instructor.instImage);
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
          this.message = res['message'];
          console.log(this.message);
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
      this.aprvStatusMsg = "'Approved'";
    } else {
      this.aprvStatus = false;
      this.aprvStatusMsg = "'Approved' canceled";
    }

    let data = {
      instId:           this.instructor['instId'],
      authKey:          localStorage.getItem('authKey'),
      isApprove:        this.aprvStatus
    }

    let mode = "toggleApprove";
    this.instructorService.updateInstructor(data, mode).subscribe({
      next: res => {
          this.message = res['message'];
          console.log(this.message);
      },
      error: (err: string) => {
        this.errorMessage = err;
        console.log(this.errorMessage);
      }
    }) 
  } 

  deleteImg(){
    this.verifyDelete("image");
  }

  deleteAll(){
    this.verifyDelete("instructor");
  }

  verifyDelete(mode: string){
    if(mode === "image"){
      if (confirm(
        "Are you shure you wan to delete image of instructor: " 
      + this.instructor.instId + " ?"
      )) {
        this.instructor.instImage = "";
    }
    }else if (mode === "instructor"){
      if (confirm(
          "Are you shure you wan to delete <all data> of instructor: " 
        + this.instructor.instId + " ?"
        )) {
        this.deleteInstructor();
      }
    }
  }

  deleteInstructor(){
    let data = {
      instId:           this.instructor['instId'],
      authKey:          localStorage.getItem('authKey'),
    }
    this.instructorService.deleteInstructor(data).subscribe({
      next: res => {
          this.message = res['message'];
          console.log(this.message);
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
