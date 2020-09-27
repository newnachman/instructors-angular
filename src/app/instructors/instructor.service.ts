import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { InstructorCreate } from './blueprints/instructor-blueprint-create';
import { IInstructor } from './blueprints/instructor-blueprint';
import { IInstructorShort } from './blueprints/instructor-blueprint-short';

@Injectable({
   providedIn: 'root'
})

export class InstructorService {

  private baseApiUrl = 'http://na-devtrain.com/instructor-api/';  
  private getAllUrl: string = this.baseApiUrl + 'api/instructor/read.php';
  private getOneUrl: string = this.baseApiUrl + 'api/instructor/read_one.php';
  private deleteUrl: string = this.baseApiUrl + 'api/instructor/delete.php';
  private postUrl: string = this.baseApiUrl + 'api/instructor/create.php';
  private imgApiKey: string = "5de2c05513267c8c604f284d793f7a74";
  private userPostUrl: string = this.baseApiUrl + 'api/instructor/auth.php';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
    
  postId : string;
  postMessage : string;
  postResult : any[];

  constructor(private http: HttpClient) {}
      
  getAuth(userData) {
    return this.http.post(this.userPostUrl, userData, this.httpOptions);
  }
  
  getInstructors(getNotApprovedToo: string):Observable<IInstructorShort[]>{
    const data = { 'authKey': getNotApprovedToo };
    return this.http.post<IInstructorShort[]>(this.getAllUrl, data, this.httpOptions).pipe(
      tap(data =>  JSON.stringify(data)),
      catchError(this.handleError)
    ); 
  }

  getOneInstructor(id: string, getNotApprovedToo: string):Observable<IInstructor>{
    const data = { 'id': id, 'authKey': getNotApprovedToo };
    return this.http.post<IInstructor>(this.getOneUrl, data, this.httpOptions).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    ); 
  }

  createInstructor(postedData: InstructorCreate){
    return this.http.post(this.postUrl, postedData, this.httpOptions);
  }

  createImg(file: File): Observable<object> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http
    .post('/upload', formData, { params: {key: this.imgApiKey}})
    .pipe(map((response) => {
        let resData = new Object();
        resData['url'] = response['data']['url'];
        resData['size'] = response['data']['size'];
        return resData;
      }
    ));
  }

  updateInstructor(updatData: object, updateMode: string):Observable<any>{
    let url: string;
    if (updateMode == "toggleApprove") {
      url = this.baseApiUrl + 'api/instructor/update_approve.php';
    } else if (updateMode == "update") {
      url = this.baseApiUrl + 'api/instructor/update.php';
    }
    return this.http.post(url, updatData, this.httpOptions).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    ); 
  }
  
  deleteInstructor(data: object) {
    return this.http.post(this.deleteUrl, data, this.httpOptions).pipe(
      tap(data => JSON.stringify(data)),
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
