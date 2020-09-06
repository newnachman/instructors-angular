import { Component, OnInit } from '@angular/core';
import { IInstructorShort } from './blueprints/instructor-blueprint-short';
import { InstructorService } from './instructor.service';

@Component({
      templateUrl: './instructors-list.component.html'
})

export class InstructorsListComponent implements OnInit {
    
    errorMessage: string;
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value:string) {
        this._listFilter = value;
        this.filteredInstructors = this.listFilter ? this.performFilter(this.listFilter) : this.instructors;
    }

    // IInstructorShort[] represent array of type (interface) IInstructorShort,
    // that contains only list of main-data (short version) about the instructors:
    filteredInstructors: IInstructorShort[];
    instructors: IInstructorShort[];

    constructor(private instructorService: InstructorService) {}

    performFilter(filterBy: string): IInstructorShort[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.instructors.filter((instructors: IInstructorShort) =>
        instructors.instField.toLocaleLowerCase().indexOf(filterBy) !== -1)
    }
  
    ngOnInit(): void { 
        this.instructorService.getInstructors('null').subscribe({
            next: instructors => {
                this.instructors = instructors;
                this.filteredInstructors = this.instructors;
            },
            error: (err: string) => this.errorMessage = err
        }) 
    }
    
}
