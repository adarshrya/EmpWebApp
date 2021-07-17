using EmpDemo.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmpDemo.DataLayer
{
    public class DepartmentService
    {
        CompDBContext db;
        public DepartmentService(CompDBContext compDBContext)
        {
            db = compDBContext;
        }

        public void Add(Department department)
        {
            var tempemp = department.Employees;
            department.Employees = null;
            db.Departments.Add(department);
            db.SaveChanges();
            department.Employees = new List<Employee>();
            foreach (var emp in tempemp)
            {
                emp.Departments.Clear();
                department.Employees.Add(emp);
            }
            db.SaveChanges();
        }
        public List<Department> GetAll()
        {
            return db.Departments.Include(x => x.Employees).ToList();
        }

        public Department GetById(int id)
        {
            return db.Departments.Include(x => x.Employees).FirstOrDefault(x => x.Id == id);
        }
        public void AddEmployee(int dptid, int empid)
        {
            var dpt = db.Departments.FirstOrDefault(x => x.Id == dptid);
            if (dpt != null)
            {
                return;
            }
            var emp = db.Employees.FirstOrDefault(x => x.Id == empid);
            if (dpt.Employees != null)
            {
                dpt.Employees = new List<Employee>();
            }
            dpt.Employees.Add(emp);
            db.SaveChanges();
        }

        public void Edit(int id, Department department)
        {
            var dpt = db.Departments.Include(x => x.Employees).FirstOrDefault(x => x.Id == id);
            dpt.Name = department.Name;
            var new_emp = department.Employees.Where(x => !dpt.Employees.Any(y => y.Id == x.Id)).ToList();
            var rm_emp = dpt.Employees.Where(x => !department.Employees.Any(y => y.Id == x.Id)).ToList();
            foreach (var emp in new_emp)
            {
                emp.Departments.Clear();
                dpt.Employees.Add(emp);
            }
            foreach (var emp in rm_emp)
            {
                dpt.Employees.Remove(emp);
            } 
            db.SaveChanges();
        }

        public void Delete(int id)
        {
            var dpt = db.Departments.FirstOrDefault(x => x.Id == id);
            db.Departments.Remove(dpt);
            db.SaveChanges();
        }
    }
}
