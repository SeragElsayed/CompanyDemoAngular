import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../Models/EmployeeModel';
import { EmployeeService } from '../../Services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../Services/department.service';
import { Department } from '../../../Models/DepartmentModel';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employeeId:number
  myEmployee:Employee
  myDepartments:Department[]

  constructor(private departmentService:DepartmentService ,private employeeService:EmployeeService, private myRoute:ActivatedRoute) { }

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
    })
  }

  getDepartments(){
    this.departmentService.getAllDepartments().subscribe(
      (res)=>{
        this.myDepartments=res;
      }
    )
  }
  onSubmit(data){
    console.log(data,"foooooooooooooooooooorm")
  }

}
