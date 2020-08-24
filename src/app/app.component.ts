import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <nav class="top navbar navbar-expand navbar-light bg=light">
  
  <ul class="nav nav-pills">
      <li style="" class="nav-link" [routerLink]="['/welcome']" routerLinkActive="active-link">Home</li>    
      <li style="" class="nav-link" [routerLink]="['/instructors']" routerLinkActive="active-link">Instructors List</li>
      <li style="" class="nav-link" [routerLink]="['/create']" routerLinkActive="active-link">Create instructor</li>
  </ul>
</nav>
<div class='container'>
  <router-outlet></router-outlet>
</div>

  
  
   
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   
}