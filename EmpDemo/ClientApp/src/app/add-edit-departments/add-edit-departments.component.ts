import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../department';
import { DepartmentsService } from '../departments.service';
import { Employee } from '../employee';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-add-edit-departments',
  templateUrl: './add-edit-departments.component.html',
  styleUrls: ['./add-edit-departments.component.css']
})
export class AddEditDepartmentsComponent implements OnInit {


  id: string
  myForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private departmentsService: DepartmentsService, private employeesService: EmployeesService) { }
  dpt: Department = {
    id: 0,
    employees: [],
    name: ""
  }
  public employees: Employee[];
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      empName: [''],
    });
    this.employeesService.GetAllEmployees().subscribe(result => {
      this.employees = result;
    }, error => console.error(error));

    if (this.id != null) {

      this.departmentsService.GetDepartment(Number.parseInt(this.id)).subscribe(result => {
        this.dpt = result;
        this.myForm.setValue({ name: result.name, empName: '' });
      }, error => console.error(error));
    }
  }
  onSubmit(form: FormGroup) {
    this.dpt.name = form.value.name;
    let api;
    if (this.dpt.id > 0) {
      api = this.departmentsService.Edit(this.dpt);
    }
    else {
      api = this.departmentsService.Add(this.dpt);
    }
    api.subscribe(result => {
      this.router.navigate((['/Departments']))
    }, error => console.error(error));
  }

  add() {
    var Nemp = this.employees.find(emp => emp.id === Number.parseInt(this.myForm.value.empName));
    var Oemp = this.dpt.employees.find(emp => emp.id === Nemp.id);
    if (Oemp == null) {
      this.dpt.employees.push(Nemp);
    }
  }

  remove(id: number) {
    var Oemp = this.dpt.employees.find(emp => emp.id === id);
    const index = this.dpt.employees.indexOf(Oemp, 0);
    if (index > -1) {
      this.dpt.employees.splice(index, 1);
    }
  }

}
