import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms'
import { EmployeeModel} from './employee-dash-board.model';
import {ApiService} from '../shared/api.service';






@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.css']

})

export class EmployeeDashBoardComponent {   
     
  constructor(private ApiService: ApiService) {}  
  data: any;  
 // EmpForm!: FormGroup;  
 // submitted = false;   
  /* EventValue: any = "Save";   */
  EventValue:string='';
  submitted:boolean=true;
  EmpForm = new FormGroup({  
    id: new FormControl(null),  
    firstname: new FormControl("",[Validators.required]),        
    lastname: new FormControl("",[Validators.required]),  
    emailid:new FormControl("",[Validators.required]),  
    mobileno: new FormControl("",[Validators.required]),  
    salary:new FormControl("",[Validators.required]),
  });

  
  ngOnInit(): void {  
    this.getEmployee();  
  
    
  }  

  getEmployee() {  
    this.ApiService.getEmployee().subscribe((response: any[]) => {  
      this.data = response;  
    })  
  }  

  deleteEmployee(id: any) {  
    this.ApiService.deleteEmployees(id).subscribe((data: any[]) => {  
      this.data = data;  
      this.getEmployee();  
    })  
  }  
  Save() {   
    //this.submitted = true;  
    
     if (this.EmpForm.invalid) {  
            return /* this.submitted; */  ;
     }  
    this.ApiService.postEmployee(this.EmpForm.value).subscribe((data: any[]) => {  
      this.data = data;  
      this.resetFrom();  
  
    })  
  }  
  UpdateEmployee() {   
    //this.submitted = true;  
    
    if (this.EmpForm.invalid) {  
     return;  
    }        
    this.ApiService.updateEmployee(this.EmpForm.value.empId,this.EmpForm.value).subscribe((data: any[]) => {  
      this.data = data;  
      this.resetFrom();  
    })  
  }  
  
  EditEmployee(Data: { id: any; firstname: any; lastname: any; emailid: any; mobileno: any; salary: any; }) {  
    this.EmpForm.controls["id"].setValue(Data.id);  
    this.EmpForm.controls["firstname"].setValue(Data.firstname);      
    this.EmpForm.controls["lastname"].setValue(Data.lastname);  
    this.EmpForm.controls["emailid"].setValue(Data.emailid);  
    this.EmpForm.controls["mobileno"].setValue(Data.mobileno);  
    this.EmpForm.controls["salary"].setValue(Data.salary);  
    this.EventValue = "UpdateEmployee";  
  }  


  resetFrom()  
  {     
    this.getEmployee();  
    this.EmpForm.reset();  
    this.EventValue = "Save";  
    //this.submitted = false;   
  }  
  
}  



/* export class EmployeeDashBoardComponent implements OnInit {

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
 /*  }

  getAllEmployee(){

    this.api.getEmployee()
    .subscribe((response: any)=>{
      this.employeeData = response;
    })
  }
  
}  */

