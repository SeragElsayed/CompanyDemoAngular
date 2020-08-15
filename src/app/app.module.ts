import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { EmployeeService } from './Services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDetailsComponent } from './Components/employee-details/employee-details.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { Routes,RouterModule  } from '@angular/router';
import { AllEmployeesComponent } from './Components/all-employees/all-employees.component'
import { EditEmployeeComponent } from './Components/edit-employee/edit-employee.component';
import { DepartmentService } from './Services/department.service';
const appRoutes: Routes = [
  // {path: "Employees",component: AppComponent},
  {path: "Employee/New",component: AddEmployeeComponent},
  {path: "Employee/:employeeId",component: EmployeeDetailsComponent},
  {path: "Employee/Edit/:employeeId",component: EditEmployeeComponent},
  {path: "",component: AllEmployeesComponent},
  // {path: "**",component: NotFound},
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent,
    AddEmployeeComponent,
    AllEmployeesComponent,
    EditEmployeeComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService,DepartmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
