import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IInstructor } from './instructor-blueprint';

@Injectable({
   providedIn: 'root'
})
export class InstructorService {
    private instructortUrl = 'api/instructors/instructors.json';

    constructor(private http: HttpClient) {}
      
    getInstructors():Observable<IInstructor[]>{
      return this.http.get<IInstructor[]>(this.instructortUrl).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
    }

    private handleError(err: HttpErrorResponse) {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
}