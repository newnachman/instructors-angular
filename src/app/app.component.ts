import { Router } from '@angular/router';
import { Component} from '@angular/core';
// import {ViewChild, ElementRef} from '@angular/core';

import { InstructorService } from './instructors/instructor.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  // @Input() isActiv: boolean;
  // @ViewChild('gggg') nameInputRef: ElementRef;
  // [style]="rla.isActive ? dsplnn : dsplblc"
  // #rla="routerLinkActive"
  // rla.isActive ? dsplnn : dsplblc
  // dsplnav = 'display:block';
  // isActivPage: boolean = false;
  dsplnn = 'display:none';
  dsplblc = 'display:block';
  showLogOutBtn = false;
  openLogIn = false;
  showMenuMobile = true;
  user: string;
  password: string;
  message: string;
  pswdTogl: string = "password"; 

  constructor( 
    private instructorService: InstructorService, 
    private router: Router) { 
  }

  closeMobileMenu() {
    this.toggleMenuMobile()
  }

  delayEffect(element: HTMLElement, classToAdd: string, classToRemove: string, wait: number) {
    setTimeout(
      () => { 
        element.classList.add(classToAdd);
        element.classList.remove(classToRemove); 
      }, 
      wait 
    );  
  }

  toggleMenuMobile() {
    let menuBtn1 = document.getElementById('menu-btn1');
    let menuBtn2 = document.getElementById('menu-btn2');
    let navLinks = document.getElementById('menu-links');
    if(this.showMenuMobile) {
      // Navigation bar ("menu") is open:
      if (this.openLogIn) {
        this.toggleLogInView();
      }
      this.delayEffect(menuBtn2, 'hide-me', 'show-me', 100);
      this.delayEffect(menuBtn1, 'show-me', 'hide-me', 100);
      this.delayEffect(navLinks, 'wrap-out-menu', 'wrap-in-menu', 100);
      this.delayEffect(navLinks, 'display-none', 'display-flex', 2000);
      this.showMenuMobile = false;
    } else {
      // Navigation bar ("menu") is closed:
      this.delayEffect(menuBtn1, 'hide-me', 'show-me', 100);
      this.delayEffect(menuBtn2, 'show-me', 'hide-me', 100);
      this.delayEffect(navLinks, 'wrap-in-menu', 'wrap-out-menu', 100);
      this.delayEffect(navLinks, 'display-flex', 'display-none', 200)
      this.showMenuMobile = true;
    }
  }

  toggleLogInView() {
    let open = document.getElementById('open');
    let close = document.getElementById('close');
    let loginwrap = document.getElementById('login-wrap');
    
    if (this.openLogIn) {
      // Link  shows "close login", the login is open, we want to close:
        // - fade the text "close" & "open" + close the login view:
      this.delayEffect(loginwrap, 'wrap-out-login', 'wrap-in-login', 100);
      this.delayEffect(close, 'myfadeout', 'myfadein', 100);
      this.delayEffect(open, 'myfadein', 'myfadeout', 1500);
        // - change display status of the text & login view:
      this.delayEffect(close, 'display-none', 'display-inline', 1500);
      this.delayEffect(open, 'display-inline', 'display-none', 1500);
      this.delayEffect(loginwrap, 'display-none', 'display-block', 3000);
      this.openLogIn = false; 
    } else {
      // Link shows "open login", the login is closed, we want to open:
        // - fade the text "open" & "close" + open the login view:
      this.delayEffect(loginwrap, 'wrap-in-login', 'wrap-out-login', 100);
      this.delayEffect(open, 'myfadeout', 'myfadein', 100);
      this.delayEffect(close, 'myfadein', 'myfadeout', 1500);
        // change display status of the text & login view:
      this.delayEffect(close, 'display-inline', 'display-none', 1500);
      this.delayEffect(open, 'display-none', 'display-inline', 1500);
      this.delayEffect(loginwrap, 'display-block', 'display-none', 100);
      this.openLogIn = true;
    }
  }

  logIn() {
    if(this.user && this.password ){
      let userData = { 'user': this.user , 'password': this.password };
      // Use the API service to check & get auth data:
      this.instructorService.getAuth(userData).subscribe((res) => {
        let response = { 
          'status': res['status'], 'name': res['name'], 'authKey': res['authKey'], 'message': res['message']
        };
        this.handleLogin(response);
      });
      console.log('user: ' + this.user);
    } else {
      console.log('empty: ' + this.user);
      this.message = 'Can not be empty fields.';
    }
  }
  
  logout(){
    this.toggleMenuMobile()
    localStorage.removeItem('authStatus');
    localStorage.removeItem('username');
    localStorage.removeItem('authKey');
    this.openLogIn = false;
    this.showLogOutBtn = false;
    let loginLink = document.getElementById('login-link');
    this.delayEffect(loginLink, 'display-inline-block', 'display-none',  100);
    this.message = '';
    this.router.navigate(['/welcome']);
  }

  handleLogin(response: object) {
    let status = response['status'];
    if(status == 'true') {
      let name = response['name'];
      let authKey = response['authKey'];
      localStorage.setItem('authStatus', status );
      localStorage.setItem('username', name );
      localStorage.setItem('authKey', authKey );
      // Handle the login UI:
      this.toggleLogInView();
      this.toggleMenuMobile()
      let loginLink = document.getElementById('login-link');
      this.delayEffect(loginLink, 'display-none', 'display-inline-block', 500);
      this.showLogOutBtn = true;
      this.message = "Welcome " + name;
      this.password = "";
      this.user = "";
      // Navigate to admin page:
      this.router.navigate(['/admin']);
      console.log(
        'status is: ' + status + '. name is: ' + name + '. authKey is: ' + authKey + '.'
        );
    } else {
      this.user = "";
      this.password = "";
      this.message = "Wrong username or password!";
      console.log(response['message']);
    }
  }
  
  // bla(activ: any) {
  //   console.log(activ);
  //   if (activ) {
  //     this.dsplnav = 'display:none';
  //   }
  // }
  
  ngOnInit() {
    // rla.isActive ? dsplnn : dsplflx
    // this.nameInputRef.nativeElement.value
      // console.log(this.nameInputRef.nativeElement.value);
    // window.addEventListener(
    //   "resize", 
    //   (event) => { 
    //     this.manageScreenSize(); 
    //   }
    // )
    let clientScreenSize = document.body.clientWidth;
    if (clientScreenSize < 951) {
      this.toggleMenuMobile()
    }
    let status = localStorage.getItem('authStatus');
    if(status == 'true') {
      let username = localStorage.getItem('username');
      this.message = "Welcome " + username;
      let loginLink = document.getElementById('login-link');
      this.delayEffect(loginLink, 'display-none', 'display-inline-block', 0);
      this.openLogIn = false;
      this.showLogOutBtn = true;
      console.log("Status AUTH: true");
    } else {
      console.log("Status AUTH: false");
    }
  }

}