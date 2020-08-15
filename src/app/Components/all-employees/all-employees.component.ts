import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../Models/EmployeeModel';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {

  allEmployees:Employee[];
  
  constructor(private employeeService:EmployeeService){

  }
  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe(
      (res)=>{
        this.allEmployees=res;
        this.employeeService.allEmployees=res;
        console.log("all emps",this.allEmployees)
      }
    )
  }
  OnDelete(employee){
    console.log("delete",employee)
    this.deleteEmployee(employee);
    this.employeeService.deleteEmployeeById(employee.EmployeeId).subscribe(
      (res)=>{},
      (error)=>{
        this.allEmployees.push(employee)
      })

  }
  deleteEmployee(employee:Employee){
    const index = this.allEmployees.indexOf(employee);
    if (index > -1) {
      this.allEmployees.splice(index, 1);
    }
  }
}
