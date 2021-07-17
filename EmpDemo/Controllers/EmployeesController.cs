using EmpDemo.DataLayer;
using EmpDemo.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmpDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        // GET: api/<EmployeeController>
        private EmployeeService employeeService;
        public EmployeesController(EmployeeService EmployeeService)
        {
            this.employeeService = EmployeeService;
        }
        [HttpGet]
        public IEnumerable<Employee> Get()
        { 
            return employeeService.GetAll();
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public Employee Get(int id)
        { 
            return employeeService.GetById(id);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public void Post(Employee employee)
        {
            employeeService.Add(employee);
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public void Put(int id, Employee employee)
        {
            employeeService.Edit(id, employee);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            employeeService.Delete(id);
        }

        [HttpPost("{id:int}/AddDepartment/{dptid:int}")] 
        public void AddDepartment(int id, int dptid)
        {
            employeeService.AddDepartment(dptid, id);
        }
    }
}
