import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../../Models/DepartmentModel';
@Injectable()
export class DepartmentService {

  BaseUrl:String="https://companydemo.azurewebsites.net/api/Department"
  constructor(private myHttp:HttpClient) { }

  getAllDepartments(){
    return this.myHttp.get<Department[]>(`${this.BaseUrl}`);
  }
  getDepartmentById(Id:number){
    return this.myHttp.get<Department>(`${this.BaseUrl}/${Id}`)
  }
  deleteDepartmetById(Id:number){
    return this.myHttp.delete(`${this.BaseUrl}/${Id}`)
  }
  addNewDepartment(newDepartment:Department){
    return this.myHttp.post(`${this.BaseUrl}`,newDepartment)
  }
  editDepartment(editedDepartment:Department){
    return this.myHttp.put(`${this.BaseUrl}`,editedDepartment)
  }

}
