import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { InstructorCreateBlueprint } from './instructor-create-blueprint';
import { IInstructor } from './instructor-blueprint';

@Injectable({
   providedIn: 'root'
})

export class InstructorService {
    
  private getAllUrl: string = 'http://localhost/php_rest_api/api/instructor/read.php';
  private getOneUrl: string = 'http://localhost/php_rest_api/api/instructor/read_one.php?';
  private postUrl: string = 'http://localhost/php_rest_api/api/instructor/create.php';
  private imgApiKey: string = "5de2c05513267c8c604f284d793f7a74";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
    
  postId : string;
  postMessage : string;
  postResult : any[];

  constructor(private http: HttpClient) {}
      
  getInstructors():Observable<IInstructor[]>{
    return this.http.get<IInstructor[]>(this.getAllUrl).pipe(
      tap(data =>  JSON.stringify(data)),
      catchError(this.handleError)
    ); 
  }

  getOneInstructor(id: number):Observable<IInstructor[]>{
    let tmpgetOneUrl = this.getOneUrl + "id=" + id;
    return this.http.get<IInstructor[]>(tmpgetOneUrl).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    ); 
  }

  createInstructor(postedData: InstructorCreateBlueprint){
    return this.http.post(this.postUrl, postedData, this.httpOptions);
  }

  createImg(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http
    .post('/upload', formData, { params: {key: this.imgApiKey}})
   .pipe(map((response) => response['data']['url']));
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