import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../Models/EmployeeModel';

@Injectable()
export class EmployeeService {

  BaseUrl:String="https://companydemo.azurewebsites.net/api/Employee"
  constructor(private myHttp:HttpClient) { }

   allEmployees:Employee[]

  findEmployeeLocally(id:number):Employee{

    // if(this.allEmployees)
    // return this.allEmployees.find((emp)=>{
    //   emp.EmployeeId==id;
    // })
    return undefined;
  }
  removeEmployeeLocally(id:number){
    let toBeDeletedEmp=this.findEmployeeLocally(id);
    const index = this.allEmployees.indexOf(toBeDeletedEmp);
    if (index > -1) {
      this.allEmployees.splice(index, 1);
    }
  }

  getAllEmployees(){
    return this.myHttp.get<Employee[]>(`${this.BaseUrl}`);
  }
  getEmployeeById(Id:number){
    return this.myHttp.get<Employee>(`${this.BaseUrl}/${Id}`)
  }
  deleteEmployeeById(Id:number){
    this.removeEmployeeLocally(Id);
    return this.myHttp.delete(`${this.BaseUrl}/${Id}`)
  }
  addNewEmployee(newEmployee:Employee){
    return this.myHttp.post(`${this.BaseUrl}`,newEmployee)
  }
  editEmployee(editedEmployee:Employee){
    return this.myHttp.put(`${this.BaseUrl}/${editedEmployee.EmployeeId}`,editedEmployee)
  }

}
