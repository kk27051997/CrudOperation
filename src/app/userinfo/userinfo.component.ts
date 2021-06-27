import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { responsedata } from '../responsedata';
@Component({
  selector: 'userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  constructor(private api:ApiserviceService) { }
  @ViewChild('f') employeeForm: NgForm;
 editFlag:boolean=false;
gender:string[]=["Male","Female"];
spinner:boolean=false;
acceptText:string="your information might be used  futher in other important third party librabies";
indvEmployee:responsedata;
employeeDetails:responsedata[];
neFlag:boolean=false;

  ngOnInit(): void {
  this.spinner=true;
  this.loadEmployee();
  
  }

  onSubmit(form:NgForm){
    this.spinner=true;
  if(!form.value.ID) {
  this.api.addEmployee(form).subscribe(
    ()=>{
     this.loadEmployee();
     },
    (error:HttpErrorResponse)=>console.log(error)
  );
    }else{
      
      for(let key in form.value){
        if(form.value[key]!=this.indvEmployee[key]){
               this.neFlag=true;
        }
      }
     if(this.neFlag){
      this.api.updateEmployee(form).subscribe(
        ()=>{
         this.loadEmployee();
         this.neFlag=false;
         },
        (error:HttpErrorResponse)=>{console.log(error)
        this.neFlag=false;
        }
      );
    }
    else{
      alert('No changes to save');
      this.spinner=false;
      this.neFlag=false;
      return false;
    }
  }
  form.reset();
  }

  loadEmployee(){
    this.api.getEmployees().subscribe(
      (value:responsedata[])=> {this.employeeDetails=value
        this.spinner=false;
      },
      
      (error)=>{console.log(error);
      this.spinner=false;
      }
    );
  }
  deleteEmployee(id:Number){
    if(confirm("Are you sure do you want to delete")){
    this.spinner=true;
    this.api.removeEmployee(id).subscribe(
      ()=>{
        this.loadEmployee();
     },
    (error:HttpErrorResponse)=>{console.log(error) 
    this.spinner=false;   
    }
    );
  }
}

editEmployee(id:Number){
 this.editFlag=true; 
  this.spinner=true;
  this.api.getEmp(id).subscribe(
    (value:responsedata)=>{
      value['checkbox'] = true;
      this.indvEmployee=value;
      this.employeeForm.setValue(value);
      console.log(value);
      this.spinner=false;
    },
    (error:HttpErrorResponse)=>{console.log(error) 
    this.spinner=false;
    }
  );
}
}
