import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './instructor-detail.component.html',
    
  })

export class InstructorDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }
  crntID: string;
  
  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.crntID = `. instructor id is: ${id}`;
  }
  onBack(): void {
    this.router.navigate(['/instructors']);
  }

}
