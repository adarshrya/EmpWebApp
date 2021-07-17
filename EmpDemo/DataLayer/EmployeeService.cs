using EmpDemo.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmpDemo.DataLayer
{
    public class EmployeeService
    {
        CompDBContext db;
        public EmployeeService(CompDBContext compDBContext)
        {
            db = compDBContext;
        }

        public void Add(Employee employee)
        {

            var tempemp = employee.Departments;
            employee.Departments = null;
            db.Employees.Add(employee);
            db.SaveChanges();
            employee.Departments = new List<Department>();

            foreach (var dpt in tempemp)
            { 
                dpt.Employees?.Clear();
                employee.Departments.Add(dpt);
            }
            db.SaveChanges();
        }

        public void AddDepartment(int dptid, int empid)
        {

            var emp = db.Employees.FirstOrDefault(x => x.Id == empid);
            if (emp != null)
            {
                return;
            }
            var dpt = db.Departments.FirstOrDefault(x => x.Id == dptid);
            if (emp.Departments != null)
            {
                emp.Departments = new List<Department>();
            }
            emp.Departments.Add(dpt);
            db.SaveChanges();
        }

        public List<Employee> GetAll()
        {
            return db.Employees.Include(x => x.Departments).ToList();
        }

        public Employee GetById(int id)
        {
            return db.Employees.Include(x => x.Departments).FirstOrDefault(x => x.Id == id);
        }

        public void Edit(int id, Employee employee)
        {
            var emp = db.Employees.Include(x => x.Departments).FirstOrDefault(x => x.Id == id);
            emp.Name = employee.Name;
            var new_dpt = employee.Departments.Where(x => !emp.Departments.Any(y => y.Id == x.Id)).ToList();
            var rm_dpt = emp.Departments.Where(x => !employee.Departments.Any(y => y.Id == x.Id)).ToList();
            foreach (var dpt in new_dpt)
            {
                dpt.Employees.Clear();
                emp.Departments.Add(dpt);
            }
            foreach (var dpt in rm_dpt)
            {
                emp.Departments.Remove(dpt);
            } 
            db.SaveChanges();
        }

        public void Delete(int id)
        {
            var emp = db.Employees.FirstOrDefault(x => x.Id == id);
            db.Employees.Remove(emp);
            db.SaveChanges();
        }
    }
}
