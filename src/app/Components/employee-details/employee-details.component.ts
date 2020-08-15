import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../Models/EmployeeModel';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId:number
  myEmployee:Employee

  constructor(private employeeService:EmployeeService, private myRoute:ActivatedRoute) { }

  ngOnInit() {

    this.getEmployeeId()
    this.getEmployee()
  }

  getEmployeeId(){
    this.myRoute.params.subscribe(params=>{
      this.employeeId=Number.parseInt(params["employeeId"])
    })
  }

  getEmployee(){

    this.myEmployee=this.employeeService.findEmployeeLocally(this.employeeId);

    if(this.myEmployee)
    return

    this.employeeService.getEmployeeById(this.employeeId).subscribe((res)=>{
      this.myEmployee=res;
    })
  }

}
