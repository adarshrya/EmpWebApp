import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component'; 
import { EmployeesComponent } from './employees/employees.component';
import { AddEditEmployeesComponent } from './add-edit-employees/add-edit-employees.component';
import { EmployeesService } from './employees.service';
import { DepartmentsService } from './departments.service';
import { DepartmentsComponent } from './departments/departments.component';
import { AddEditDepartmentsComponent } from './add-edit-departments/add-edit-departments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule, MatDialog, MatDialogModule, MatDialogRef, MatDividerModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';
import { MyLoaderComponent } from './my-loader/my-loader.component';
import { LoaderService } from './loader.service';
import { LoaderInterceptorService } from './loader-interceptor.service';
 
 

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent, 
    EmployeesComponent,
    AddEditEmployeesComponent,
    DepartmentsComponent,
    AddEditDepartmentsComponent,
    MyLoaderComponent 
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressSpinnerModule, 
    RouterModule.forRoot([
      { path: '', redirectTo: 'Employees', pathMatch:'full' },
      { path: 'Employees', component: EmployeesComponent },
      { path: 'Employees/Add', component: AddEditEmployeesComponent },
      { path: 'Employees/Edit/:id', component: AddEditEmployeesComponent },
      { path: 'Departments', component: DepartmentsComponent },
      { path: 'Departments/Add', component: AddEditDepartmentsComponent },
      { path: 'Departments/Edit/:id', component: AddEditDepartmentsComponent } 
    ]), BrowserAnimationsModule
  ],
  providers: [EmployeesService, DepartmentsService, LoaderService,
    
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
