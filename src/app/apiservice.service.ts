import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { responsedata } from './responsedata';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiserviceService {
  
  

  constructor(private http:HttpClient) { }
  
  loadFlag = new EventEmitter<responsedata[]>();
  
//private  user = new BehaviorSubject<responsedata>(null);
//employeeDetails = this.user.asObservable();

  readonly apiUrl="https://localhost:44307";
  
  
   addEmployee(form:NgForm){
     
     return this.http.post(this.apiUrl+'/api/Employee',form.value);
  }

  updateEmployee(form:NgForm){
    return this.http.put(this.apiUrl+'/api/Employee/'+form.value.ID,form.value)
  }

  removeEmployee(id:Number){
   return this.http.delete(this.apiUrl+'/api/Employee/'+id).pipe(
     catchError(errorres=>{
       return throwError(errorres);
     })
   )
  }

  getEmployees(){
    return this.http.get(this.apiUrl+'/api/Employee').pipe(
      catchError(errorres=>{
        return throwError(errorres);
      })
    );
   
  }
  getEmp(id:Number){
    return this.http.get(this.apiUrl+'/api/Employee/'+id).pipe(
      catchError(errorres=>{
        return throwError(errorres);
      })
    );
  }
 

}


