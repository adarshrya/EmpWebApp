import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'Departments/' +  id);
  }
  Add(dpt: Department) { 
    return this.http.post(this.baseUrl + 'Departments', dpt);
  }
  Edit(dpt: Department) { 
    return this.http.put(this.baseUrl + 'Departments/' + dpt.id, dpt);
  }
  GetDepartment(id: number) {
    return this.http.get<Department>(this.baseUrl + 'Departments/' + id);
  }
  GetAllDepartments() { 
    return this.http.get<Department[]>(this.baseUrl + 'Departments'); 
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  } 
}
