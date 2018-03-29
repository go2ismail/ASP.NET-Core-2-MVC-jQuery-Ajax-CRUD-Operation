using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using src.Data;
using src.Models;

namespace src.Controllers.api
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class EmployeeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public IEnumerable<Employee> GetEmployee()
        {
            return _context.Employee;
        }

        // GET: api/Employee/5
        [HttpGet]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _context.Employee.SingleOrDefaultAsync(m => m.employeeId == id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // PUT: api/Employee/5
        [HttpPut]
        public async Task<IActionResult> PutEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            

            _context.Entry(employee).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Employee
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> PostEmployee(Employee employee)
        {
            if (employee.employeeId == 0)
            {
                _context.Employee.Add(employee);

                await _context.SaveChangesAsync();
            }

           

            return StatusCode(200, employee);
        }

        // DELETE: api/Employee/5
        [HttpDelete]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _context.Employee.SingleOrDefaultAsync(m => m.employeeId == id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employee.Any(e => e.employeeId == id);
        }
    }
}