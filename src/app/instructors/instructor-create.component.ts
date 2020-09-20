import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { InstructorService } from './instructor.service';
import { InstructorCreate } from './blueprints/instructor-blueprint-create';

@Component({
    templateUrl: './instructor-create.component.html',
    styleUrls: ['./instructor-create.component.css']
})

export class InstructorCreateComponent {
  
  constructor( 
    private router: Router, 
    private instructorService: InstructorService) { 
    }

  response: any;
  responseString: string;
  name: string;
  field: string;
  title: string;
  email: string;
  phone: string;
  link: string;
  imgStatusMsg: string;
  diploma: string;
  descr: string;
  img: string = "http://tempimag.es/600x600/20B2AA/D1DEDE/temporary image.png";
  imgName: string = "";
  goPickImg = true;
  imgLoad = false;
  imgLoadStep = false;
  replaceImgBtn = false;
  errorMessage: string;
  data = new InstructorCreate();
  input: HTMLInputElement;

  onInputImg(e: Event) {
    console.log("pick img clicked");
    this.input = e.target as HTMLInputElement;
    this.imgName = this.input.files[0].name;
    this.goPickImg = false;
  }
 
  uploadImg() {
    this.imgStatusMsg = "Saving your image ..."
    this.imgLoad = true;
    this.imgLoadStep = true;
    this.instructorService.createImg(this.input.files[0])
    .subscribe(
      (data) => {
        this.img = data['url'] ;
        let kb = (data['size'] * 0.0009765625).toFixed(2);
        console.log("size: " + kb + " KB.");
        // change UI messages
        this.imgStatusMsg = "Image saved."
      });
  }


  submitCreate() {
    // pass data to the "IIblueprint" 
    this.data.name     = this.name;
    this.data.field    = this.field;
    this.data.title    = this.title;
    this.data.descr    = this.descr;
    this.data.img      = this.img;
    this.data.email    = this.email;
    this.data.phone    = this.phone;
    this.data.link     = this.link;
    this.data.diploma  = this.diploma;
    
    // send data to the API
    this.instructorService.createInstructor(this.data)
    .subscribe(
      (res)=>{
        this.response = res;
        console.log(this.response['created_id']);
        console.log(this.response['message']);
        this.responseString = this.response['message'];
        this.emptyFields();
      });
  }
  
  checkAndSubmit() {
    this.errorMessage = "";
    // Check if user has picked img but didn't save it:
    if(!this.goPickImg && !this.imgLoadStep){
      this.errorMessage = "Must save your image!";
    }
    else if(
      this.name            && 
      this.imgLoadStep     && 
      this.field           && 
      this.title           && 
      this.descr           && 
      this.email           && 
      this.phone           && 
      this.diploma         && 
      this.link
      ){
      this.submitCreate();
    }else {
      this.errorMessage = "Must full all fields!";
    }
  }

  emptyFields() {
    this.name  = "";
    this.field = "";
    this.title = "";
    this.email = "";
    this.phone = "";
    this.link  = "";
    this.diploma = "";
    this.descr = "";
    this.img   = "http://tempimag.es/600x600/20B2AA/D1DEDE/temporary image.png";
  }

}
