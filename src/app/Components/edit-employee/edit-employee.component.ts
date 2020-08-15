import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../Models/EmployeeModel';
import { EmployeeService } from '../../Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../Services/department.service';
import { Department } from '../../../Models/DepartmentModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employeeId:number
  myEmployee:Employee
  myDepartments:Department[]
  myDepartment:Department
  DepartmentID

  
  EditEmployeeForm = new FormGroup({
    EmployeeId: new FormControl('',Validators.required),
    FirstName: new FormControl('',Validators.required),
    LastName: new FormControl('',Validators.required),
    PhoneNumber: new FormControl('',Validators.required),
    BirthDate: new FormControl('',Validators.required),
    DepartmentName: new FormControl('',Validators.required),
    DepartmentId:new FormControl('',Validators.required),
  });


  constructor(private departmentService:DepartmentService ,private employeeService:EmployeeService, private myRoute:ActivatedRoute,private Router:Router) { }

  ngOnInit() {

    this.getEmployeeId()
    this.getEmployee()
    this.getDepartments()
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
      this.EditEmployeeForm.setValue(
        {
          DepartmentId:this.myEmployee.DepartmentId,
          DepartmentName:this.myEmployee.DepartmentName,
          FirstName: this.myEmployee.FirstName,
          LastName: this.myEmployee.LastName,
          PhoneNumber: this.myEmployee.PhoneNumber,
          BirthDate:this.myEmployee.BirthDate,
          EmployeeId:this.myEmployee.EmployeeId
        }
        )

    })
  }

  getDepartments(){
    this.departmentService.getAllDepartments().subscribe(
      (res)=>{
        this.myDepartments=res;
      }
    )
  }
  
  onSubmit(){
    let editedEmployee = this.EditEmployeeForm.value;
    
    this.employeeService.editEmployee(editedEmployee).subscribe((res) =>{
        this.Router.navigate([""]);
      })
    }

    onChange(value){
      this.myDepartment = this.myDepartments.find(item => item.DepartmentName === value);
      this.EditEmployeeForm.setValue(
        {
          DepartmentId:this.myDepartment.DepartmentId,
          DepartmentName:this.myDepartment.DepartmentName,
              FirstName: this.myEmployee.FirstName,
              LastName: this.myEmployee.LastName,
              PhoneNumber: this.myEmployee.PhoneNumber,
          BirthDate:this.myEmployee.BirthDate,
          EmployeeId:this.myEmployee.EmployeeId

        })
     
      this.DepartmentID = this.myDepartment.DepartmentId;
   
     }

}
