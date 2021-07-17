import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  public employees: Employee[];
  constructor(private employeesService: EmployeesService   ) { }

  ngOnInit() {
    this.employeesService.GetAllEmployees().subscribe(result => {
      this.employees = result;
    }, error => console.error(error));
  } 

  delete(id: number) {
    if (confirm("Sure")) {
      this.employeesService.delete(id).subscribe(result => {
        this.employeesService.GetAllEmployees().subscribe(result => {
          this.employees = result;
        }, error => console.error(error));
      }, error => console.error(error));
    }
  }
}
