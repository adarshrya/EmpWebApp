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
    public class DepartmentsController : ControllerBase
    {
        DepartmentService departmentService;
        public DepartmentsController(DepartmentService departmentService)
        {
            this.departmentService = departmentService;
        }
        // GET: api/<DepartmentsController>
        [HttpGet]
        public IEnumerable<Department> Get()
        {
            return departmentService.GetAll();
        }

        // GET api/<DepartmentsController>/5
        [HttpGet("{id}")]
        public Department Get(int id)
        {
            return departmentService.GetById(id);
        }

        // POST api/<DepartmentsController>
        [HttpPost]
        public void Post(Department  department)
        {
            departmentService.Add(department);
        }

        // PUT api/<DepartmentsController>/5
        [HttpPut("{id}")]
        public void Put(int id, Department department)
        {
            departmentService.Edit(id,department);
        }

        // DELETE api/<DepartmentsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            departmentService.Delete(id);
        }

        [HttpPost("{id:int}/AddEmployee/{empid:int}")]
        public void AddEmployee(int id, int empid)
        {
            departmentService.AddEmployee(id, empid);
        }
    }
}
