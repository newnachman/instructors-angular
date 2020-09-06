import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IInstructor } from './blueprints/instructor-blueprint';
import { InstructorService } from './instructor.service';

@Component({
    templateUrl: './instructor-detail.component.html',
    
  })

export class InstructorDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private instructorService: InstructorService) { }
  
  instructor: IInstructor;
  crntID: string;
  errorMessage: string;
  
  ngOnInit(): void { 
    let id = this.route.snapshot.paramMap.get('id');
    this.instructorService.getOneInstructor(id, 'null').subscribe({
      next: instructor => {
          this.instructor = instructor;
      },
      error: (err: string) => this.errorMessage = err
    }) 
  }

  onBack(): void {
    this.router.navigate(['/instructors']);
  }

}
