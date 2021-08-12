import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data:any) {

    return this.http.post<any>("http://localhost:3000/posts" , data)
    .pipe(map((res:any) =>{
      return res;

   }))  
  }

  getEmployee(){

    return this.http.get<any>("http://localhost:3000/posts" )
    .pipe(map((res:any) =>{
      return res;

   }))  
  }
  updateEmployee(data:any,id:number){

    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any) =>{
      return res;

   })) 
  } 

   deleteEmployees(id:number){

    return this.http.delete<any>("http://localhost:3000/posts/"+id )
    .pipe(map((res:any) =>{
      return res;

   }))  
  }
}


/*import { Injectable } from '@angular/core';  
import { HttpClient,HttpHeaders }    from '@angular/common/http';  
@Injectable({  
  providedIn: 'root'  
})  
  
export class ApiService {  
  
constructor(private http: HttpClient) { }  
  httpOptions = {  
    headers: new HttpHeaders({  
      'Content-Type': 'application/json'  
    })  
  }    
  getemployee(){  
       
    return this.http.get ('https://localhost:44390/api/Employee/Get');
    
  }  
  
  postemployee(formData: any){  
    return this.http.post('/api/Employee',formData);  
  }  
  
  putemployee(id: any,formData: any){  
    return this.http.put('/api/Employee/'+id,formData);  
  }  
  deleteemployee(id: any){  
    return this.http.delete('/api/Employee/'+id);  
  }  
    
} */