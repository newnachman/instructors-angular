import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InstructorService } from './instructor.service';
import { InstructorCreateBlueprint } from './instructor-create-blueprint';

@Component({
    templateUrl: './instructor-create.component.html',
    styleUrls: ['./instructor-create.component.css']
})

export class InstructorCreateComponent {
  
  constructor( 
    private router: Router, 
    private instructorService: InstructorService) { 
    }

  response : any;
  responseString : string;
  name: string;
  field: string;
  title: string;
  descr: string;
  img: string;
  showBtn = false;
  errMsg = false;
  imgLoad = false;
  errorMessage: string;
  data = new InstructorCreateBlueprint();

  //_______ Trial only:

  authData: string;
  auth = false;

  saveAuth() {
    localStorage.setItem('Item 1', 'bla');
    this.auth = true;
    
  }

  showAuth() {
    this.authData = localStorage.getItem('Item 1');
  }

//_______ End of trial      |   Dont forget to delete!   |

  onInputImg(e: Event) {
    this.imgLoad = true;
    const input = e.target as HTMLInputElement;
    this.instructorService.createImg(input.files[0])
    .subscribe(
      url => {
        this.img = url;
        this.imgLoad = false;
        this.checkFields()       
      });
  }
  
  submitCreate() {
    // if (this.checkFields()) {
      this.errMsg = false;
      this.data.name  = this.name;
      this.data.field = this.field;
      this.data.title = this.title;
      this.data.descr = this.descr;
      this.data.img   = this.img;
    // } else {
    //   this.errMsg = true;
    // }
    
    this.instructorService.createInstructor(this.data).subscribe((res)=>{
      this.response = res;
      this.responseString = this.response['created_id'] + " - " + this.response['message'] ;
      this.emptyFields();
    });
  }
  
  checkFields() {
    if(this.name && this.field && this.title && this.descr && this.img){
      this.showBtn = true;
      this.errMsg = false;
    }else {
      this.errMsg = true;
      this.showBtn = false;
    }
  }

  emptyFields() {
    this.name  = "";
    this.field = "";
    this.title = "";
    this.descr = "";
    this.img   = "";  
  }

}
