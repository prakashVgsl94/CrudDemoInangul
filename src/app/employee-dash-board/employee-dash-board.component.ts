import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { EmployeeModel } from './employee-dash-board.model';
import {ApiService} from '../shared/api.service';




@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.css']
})
export class EmployeeDashBoardComponent implements OnInit {

  formValue !: FormGroup;
  touched='';
  dirty='';
  error='';
  singupForm:any;
  employeeModelobj : EmployeeModel = new EmployeeModel();
 // api: any;
  employeeData: any;
  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
       firstname : ["",Validators.required, Validators.minLength(2), Validators.maxLength(10)],
       lastname : [' '],
       emailid : [' '],
       mobileno : [' '],
       salary : [' '],
   })
   this.getAllEmployee();
   
  }
  
  get firstname () {
    return this.singupForm.get('firstname')
  }
  postEmployeeDetails(){
    this.employeeModelobj.firstname = this.formValue.value.firstname;
    this.employeeModelobj.lastname = this.formValue.value.lastname;
    this.employeeModelobj.emailid = this.formValue.value.emailid;
    this.employeeModelobj.mobileno = this.formValue.value.mobileno;
    this.employeeModelobj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelobj)
     .subscribe((response: any)=>{
      console.log(response);
      alert("Employee Added Successfully") 
      this.formValue.reset(); 
      //this.getAllEmployee();
    })

      /*err=>{
      alert ("Something went wrong");
    })*/
  }

  getAllEmployee(){

    this.api.getEmployee()
    .subscribe((response: any)=>{
      this.employeeData = response;
    })
  }
  
}