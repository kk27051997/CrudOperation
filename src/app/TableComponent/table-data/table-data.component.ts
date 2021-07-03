import { Component, OnInit, OnDestroy, Output,EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiserviceService } from 'src/app/apiservice.service';
import { responsedata } from 'src/app/responsedata';


@Component({
  selector: 'table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit, OnDestroy {
@Output() editEmp = new EventEmitter<Number>();
@Output() delEmp = new EventEmitter<Number>();
//@Output() spinnerFlag = new EventEmitter<boolean>();
loadFlagSubscription:Subscription;
load:Subscription;
  constructor(private api:ApiserviceService) { }

  employeeDetails:responsedata[];
  ngOnInit() {
    if(this.employeeDetails){
   this.loadFlagSubscription=this.api.loadFlag.subscribe(
     (value:responsedata[])=>
      this.employeeDetails=value
   );
   }
   else{
    this.api.getEmployees().subscribe(
      (value:responsedata[])=> {
     this.employeeDetails=value;
      });

  }
  }
  

  editEmployee(id:Number){
  this.editEmp.emit(id);
  }
  deleteEmployee(id:Number){
    this.delEmp.emit(id);
  }
  ngOnDestroy(){
   //this.loadFlagSubscription.unsubscribe();
    //this.load.unsubscribe();
  }
}
