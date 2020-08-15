import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from '../../../Models/DepartmentModel';
import { DepartmentService } from '../../Services/department.service';
import { Router } from '@angular/router'
import { EmployeeService } from '../../Services/employee.service';
import { Employee } from '../../../Models/EmployeeModel';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  

    AddEmployeeForm = new FormGroup({
      FirstName: new FormControl('',Validators.required),
      LastName: new FormControl('',Validators.required),
      PhoneNumber: new FormControl('',Validators.required),
      BirthDate: new FormControl('',Validators.required),
      DepartmentName: new FormControl('',Validators.required),
      DepartmentId:new FormControl('',Validators.required),
    });
  
    AllDepartments : Department[];
    Department : Department;
  
  
    constructor(private DepartmentService:DepartmentService ,
                private EmployeeService : EmployeeService,
                private Router : Router) { }
  
    ngOnInit() {
     this.getAllDepartments();
    }
  
    getAllDepartments(){
  this.DepartmentService.getAllDepartments().subscribe((res) => {
  this.AllDepartments = res;
  }),err=>{
    console.log(err);
  }}
  
  
  DepartmentID :Number  ;
  
  onChange(value){
  
  
   this.Department = this.AllDepartments.find(item => item.DepartmentName === value);
  
   this.DepartmentID = this.Department.DepartmentId;
  
  
  }
  
  employee : Employee;
  
  
  onSubmit(){
  this.employee = this.AddEmployeeForm.value;
  
  this.EmployeeService.addNewEmployee(this.employee).subscribe((res) =>{
      this.Router.navigate([""]);
    })
  }

}
