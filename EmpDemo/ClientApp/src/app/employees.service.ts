import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'Employees/' + id);
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  public GetAllEmployees() {
    return this.http.get<Employee[]>(this.baseUrl + 'Employees');
  }
  public Add(emp: Employee) {
    return this.http.post(this.baseUrl + 'Employees', emp);
  }
  public Edit(emp: Employee) {
    return this.http.put(this.baseUrl + 'Employees/' + emp.id, emp);
  }
  public GetEmployee(id: number) {
    return this.http.get<Employee>(this.baseUrl + 'Employees/' + id);
  }
}
