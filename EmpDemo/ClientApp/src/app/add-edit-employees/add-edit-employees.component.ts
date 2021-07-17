import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../department';
import { DepartmentsService } from '../departments.service';
import { Employee } from '../employee';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-add-edit-employees',
  templateUrl: './add-edit-employees.component.html',
  styleUrls: ['./add-edit-employees.component.css']
})
export class AddEditEmployeesComponent implements OnInit {

  id: string
  myForm: FormGroup;
  departments: Department[];
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private employeesService: EmployeesService, private departmentsService: DepartmentsService  ) { }
  emp: Employee = {
    id: 0,
    departments: [],
    name: ""
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      dptName: [''],
    });
    this.departmentsService.GetAllDepartments().subscribe(result => {
      this.departments = result;
    }, error => console.error(error));

    if (this.id != null) {  
      this.employeesService.GetEmployee(Number.parseInt(this.id)).subscribe(result => {
        this.emp = result;
        this.myForm.setValue({ name: result.name, dptName: '' });
      }, error => console.error(error));
    }
  }

  onSubmit(form: FormGroup) {
    this.emp.name = form.value.name;
    let api;
    if (this.emp.id > 0) {
      api= this.employeesService.Edit(this.emp);
    }
    else {
      api = this.employeesService.Add(this.emp);
    }
    api.subscribe(result => {
     
        this.router.navigate((['/Employees'])) 
    }, error => { console.error(error);  });
  }

  add() {
    if (this.myForm.value.dptName != '') {
    var Ndept = this.departments.find(emp => emp.id === Number.parseInt(this.myForm.value.dptName));
    var Odept = this.emp.departments.find(emp => emp.id === Ndept.id);
    if (Odept == null) {
      this.emp.departments.push(Ndept);
      }
    }
  }
 

  remove(id: number) {
    var Oemp = this.emp.departments.find(emp => emp.id === id);
    const index = this.emp.departments.indexOf(Oemp, 0);
    if (index > -1) {
      this.emp.departments.splice(index, 1);
    }
  }
}
