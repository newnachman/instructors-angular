import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <nav 
  *ngIf='cond'
  class="navbar navbar-expand navbar-light bg=light">
  <p  class="navbar-brand">{{title}}</p>
  
  <ul class="nav nav-pills">
      <li style="display:inline; border: 2px solid red; margin: 5px; padding: 5px;" class="nav-link" [routerLink]="['/welcome']">Home</li>
      <li style="display:inline; border: 2px solid red; margin: 5px; padding: 5px;" class="nav-link" [routerLink]="['/instructors']">Instructors List</li>
  </ul>
</nav>
<div class='container'>
  <router-outlet></router-outlet>
</div>

  
  
   
  `
})
export class AppComponent {
  title = 'instructor-angular **title** from app.component';
  cond: boolean = true;
   tempList: any[] = [{
    "instId": 1,
    "instName": "meir chaviv",
    "insrField": "sports"
},
{
    "instId": 2,
    "instName": "shalom dvir",
    "insrField": "arts"
},
{
    "instId": 3,
    "instName": "shalom dvir2",
    "insrField": "arts"
}
]; 
}
// <router-outlet></router-outlet>
// 
// <div>
// 	    <h1>{{title}}</h1>
// 	     <inst-list></inst-list>
// 	  </div>

//<div class="kdkd" 
// *ngFor =  'let inst of tempList'
// >
// <div> {{inst.instId}} </div>
// </div>  