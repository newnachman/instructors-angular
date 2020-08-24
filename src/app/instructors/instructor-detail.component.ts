import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IInstructor } from './instructor-blueprint';
import { InstructorService } from './instructor.service';

@Component({
    templateUrl: './instructor-detail.component.html',
    
  })

export class InstructorDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private instructorService: InstructorService) { }
  
  // instructors: any[] = [];
  instructors: IInstructor[] = [];
  crntID: string;
  errorMessage: string;
  
  ngOnInit(): void { 
    let id = +this.route.snapshot.paramMap.get('id');
    // this.crntID = `. instructor id is: ${id}`;
    this.instructorService.getOneInstructor(id).subscribe({
      next: instructors => {
          this.instructors = instructors;
          // this.filterInstructor(id);
      },
      error: (err: string) => this.errorMessage = err
  }) 
  }

  // filterInstructor(crntInstId: number): void{
  //   for (let inst of this.instructors) {
	//     if(inst['instId'] == crntInstId){
  //   	  this.instructors['instName'] = inst['instName'] ;
  //       this.instructors['instField'] = inst['instField'] ;
  //       this.instructors['instTitle'] = inst['instTitle'] ;
  //       this.instructors['instDescription'] = inst['instDescription'] ;
  //       this.instructors['instImage'] = inst['instImage'] ;
  //       break;
  //     }
  //   }
  // }

  onBack(): void {
    this.router.navigate(['/instructors']);
  }

}
