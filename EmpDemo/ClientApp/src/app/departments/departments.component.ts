import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { DepartmentsService } from '../departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  public departments: Department[];
  constructor(private departmentsService: DepartmentsService) { }

  ngOnInit() {
    this.departmentsService.GetAllDepartments().subscribe(result => {
       this.departments = result;
    }, error => console.error(error));
  }

  delete(id: number) {
    if (confirm("Sure")) {
      this.departmentsService.delete(id).subscribe(result => {
        this.departmentsService.GetAllDepartments().subscribe(result => {
          this.departments = result;
        }, error => console.error(error));
      }, error => console.error(error));
    }
  }
}
