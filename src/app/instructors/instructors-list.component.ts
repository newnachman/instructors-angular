import { Component } from '@angular/core';
import { IInstructor } from './instructor-blueprint';
import { InstructorService } from './instructor.service';

@Component({
      templateUrl: './instructors-list.component.html'
})

export class InstructorsListComponent {
    
    errorMessage: string;
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value:string) {
        this._listFilter = value;
        this.filteredInstructors = this.listFilter ? this.performFilter(this.listFilter) : this.instructors;
    }

    filteredInstructors: IInstructor[];
    instructors: IInstructor[] = [];

      constructor(private instructorService: InstructorService) {
         
      }
    //   onRatingClicked(message: string): void {
    //        this.pageTitle = 'instructors List: ' + message; 
    //   }
      performFilter(filterBy: string): IInstructor[]{
          filterBy = filterBy.toLocaleLowerCase();
          return this.instructors.filter((instructors: IInstructor) =>
          instructors.instField.toLocaleLowerCase().indexOf(filterBy) !== -1)
      }
    //   toggleImage(): void {
    //       this.showImage = !this.showImage;
    //   }
      ngOnInit(): void { 
            this.instructorService.getInstructors().subscribe({
                next: instructors => {
                    this.instructors = instructors;
                    this.filteredInstructors = this.instructors;
                },
                error: (err: string) => this.errorMessage = err
            }) 
            
      }



    
}
