import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { InstructorService } from './instructors/instructor.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  showLogOutBtn = false;
  openLogIn = false;
  user: string;
  password: string;
  message: string;
  private pswdTogl: string = "password"; 

  constructor( 
    private instructorService: InstructorService, 
    private router: Router) { 
  }

  showAsText() {
    this.pswdTogl = "text";
  }

  showAsPswd() {
    this.pswdTogl = "password";
  }

  welcomeFade(getIn: HTMLElement) {
    getIn.classList.add('myfadein');
    getIn.classList.remove('myfadeout');
    this.delayOut(getIn, 'inline'); 
  }

  delayOut(element: HTMLElement, mode: string) {
    // mode = 'none' / 'inline'
    element.style.display = mode; 
  }

  delayOut2() {
    this.openLogIn = false;
  }

  toggleLogIn() {
    let open = document.getElementById('open');
    let close = document.getElementById('close');
    let loginwrap = document.getElementById('login-wrap');

    if (this.openLogIn) {
      // button currently shows: "close login", the login is open already.
      close.classList.remove('myfadein');
      close.classList.add('myfadeout');
      loginwrap.classList.remove('wrap-in');
      loginwrap.classList.add('wrap-out');
      
      setTimeout(
        () => {
          this.delayOut2();
        }, 
        3500
      );
      
      setTimeout(
        () => {
          this.delayOut(close, "none");
        }, 
        1500
      );
      
      setTimeout(
        () => {
          this.welcomeFade(open);
        }, 
        1500
      );

    } else {
      // button currently shows: "open login", the login is closed.
      this.openLogIn = true;
      open.classList.remove('myfadein');
      open.classList.add('myfadeout');
      
      setTimeout(
        () => {
          this.delayOut(open, "none");
        }, 
        1500
      );
      
      setTimeout(
        () => {
          this.welcomeFade(close);
        }, 
        1500
      );
    }
      
  }

  logIn() {
    if(this.user && this.password ){
      let userData = { 'user': this.user , 'password': this.password };
      // Use the API service to checkqget auth data:
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
  alert() {
    console.log('change');
  }
  logout(){
    localStorage.removeItem('authStatus');
    localStorage.removeItem('username');
    localStorage.removeItem('authKey');
    this.openLogIn = false;
    this.showLogOutBtn = false;
    this.message = '';
    this.router.navigate(['/welcome']);
  }

  handleLogin(response: object) {
    let status = response['status'];
    if(status == 'true') {
      let name = response['name'];
      let authKey = response['authKey'];
      this.message = "Welcome " + name;
      localStorage.setItem('authStatus', status );
      localStorage.setItem('username', name );
      localStorage.setItem('authKey', authKey );
      this.openLogIn = false;
      this.showLogOutBtn = true;
      this.password = "";
      this.user = "";
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

  ngOnInit() {
    let status = localStorage.getItem('authStatus');
    if(status == 'true') {
      let username = localStorage.getItem('username');
      this.message = "Welcome " + username;
      this.openLogIn = false;
      this.showLogOutBtn = true;
      console.log("Status AUTH: true");
    } else {
      console.log("Status AUTH: false");
    }
  }

}