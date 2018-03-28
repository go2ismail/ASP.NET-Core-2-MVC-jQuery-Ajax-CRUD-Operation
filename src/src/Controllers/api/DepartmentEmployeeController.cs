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
    [Authorize(Policy = "ApiUser")]
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class DepartmentEmployeeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DepartmentEmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DepartmentEmployee
        [HttpGet]
        public IEnumerable<DepartmentEmployee> GetDepartmentEmployee()
        {
            return _context.DepartmentEmployee;
        }

        // GET: api/DepartmentEmployee/5
        [HttpGet]
        public async Task<IActionResult> GetDepartmentEmployeeById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var departmentEmployee = await _context
                .DepartmentEmployee
                .SingleOrDefaultAsync(m => m.departmentEmployeeId == id);

            if (departmentEmployee == null)
            {
                return NotFound();
            }

            return Ok(departmentEmployee);
        }

        
        [HttpGet]
        public async Task<List<DepartmentEmployee>> GetDepartmentEmployeeByDepartmentId(int id)
        {

            List<DepartmentEmployee> result = await _context
                    .DepartmentEmployee
                    .Include(x => x.employee)
                    .Where(x => x.departmentId.Equals(id)).ToListAsync();



            return result;
        }

        // PUT: api/DepartmentEmployee/5
        [HttpPut]
        public async Task<IActionResult> PutDepartmentEmployee(DepartmentEmployee departmentEmployee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            

            _context.Entry(departmentEmployee).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/DepartmentEmployee
        [HttpPost]
        public async Task<IActionResult> PostDepartmentEmployee(DepartmentEmployee departmentEmployee)
        {
            _context.DepartmentEmployee.Add(departmentEmployee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartmentEmployee", new { id = departmentEmployee.departmentEmployeeId }, departmentEmployee);
        }

        // DELETE: api/DepartmentEmployee/5
        [HttpDelete]
        public async Task<IActionResult> DeleteDepartmentEmployee(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var departmentEmployee = await _context.DepartmentEmployee.SingleOrDefaultAsync(m => m.departmentEmployeeId == id);
            if (departmentEmployee == null)
            {
                return NotFound();
            }

            _context.DepartmentEmployee.Remove(departmentEmployee);
            await _context.SaveChangesAsync();

            return Ok(departmentEmployee);
        }

        private bool DepartmentEmployeeExists(int id)
        {
            return _context.DepartmentEmployee.Any(e => e.departmentEmployeeId == id);
        }
    }
}