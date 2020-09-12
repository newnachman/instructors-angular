import { Component } from '@angular/core';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent {
  ngOnInit() {
      document.addEventListener("visibilitychange", function() {
          if (document.hidden) {
            //do whatever you want
            console.log("Hidden");
          }
          else {
            //do whatever you want
            console.log("SHOWN");
          }
      });
  }
}