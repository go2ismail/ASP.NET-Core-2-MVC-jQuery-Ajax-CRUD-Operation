using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using src.Data;
using src.Models;

namespace src.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class DepartmentEmployeeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DepartmentEmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: DepartmentEmployee
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.DepartmentEmployee.Include(d => d.department).Include(d => d.employee);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: DepartmentEmployee/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var departmentEmployee = await _context.DepartmentEmployee
                .Include(d => d.department)
                .Include(d => d.employee)
                .SingleOrDefaultAsync(m => m.departmentEmployeeId == id);
            if (departmentEmployee == null)
            {
                return NotFound();
            }

            return View(departmentEmployee);
        }

        // GET: DepartmentEmployee/Create
        public IActionResult Create()
        {
            ViewData["departmentId"] = new SelectList(_context.Department, "departmentId", "name");
            ViewData["employeeId"] = new SelectList(_context.Employee, "employeeId", "fullName");
            return View();
        }

        // POST: DepartmentEmployee/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("departmentEmployeeId,description,departmentId,employeeId")] DepartmentEmployee departmentEmployee)
        {
            if (ModelState.IsValid)
            {
                _context.Add(departmentEmployee);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["departmentId"] = new SelectList(_context.Department, "departmentId", "name", departmentEmployee.departmentId);
            ViewData["employeeId"] = new SelectList(_context.Employee, "employeeId", "fullName", departmentEmployee.employeeId);
            return View(departmentEmployee);
        }

        // GET: DepartmentEmployee/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var departmentEmployee = await _context.DepartmentEmployee.SingleOrDefaultAsync(m => m.departmentEmployeeId == id);
            if (departmentEmployee == null)
            {
                return NotFound();
            }
            ViewData["departmentId"] = new SelectList(_context.Department, "departmentId", "name", departmentEmployee.departmentId);
            ViewData["employeeId"] = new SelectList(_context.Employee, "employeeId", "fullName", departmentEmployee.employeeId);
            return View(departmentEmployee);
        }

        // POST: DepartmentEmployee/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("departmentEmployeeId,description,departmentId,employeeId")] DepartmentEmployee departmentEmployee)
        {
            if (id != departmentEmployee.departmentEmployeeId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(departmentEmployee);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DepartmentEmployeeExists(departmentEmployee.departmentEmployeeId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["departmentId"] = new SelectList(_context.Department, "departmentId", "name", departmentEmployee.departmentId);
            ViewData["employeeId"] = new SelectList(_context.Employee, "employeeId", "fullName", departmentEmployee.employeeId);
            return View(departmentEmployee);
        }

        // GET: DepartmentEmployee/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var departmentEmployee = await _context.DepartmentEmployee
                .Include(d => d.department)
                .Include(d => d.employee)
                .SingleOrDefaultAsync(m => m.departmentEmployeeId == id);
            if (departmentEmployee == null)
            {
                return NotFound();
            }

            return View(departmentEmployee);
        }

        // POST: DepartmentEmployee/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var departmentEmployee = await _context.DepartmentEmployee.SingleOrDefaultAsync(m => m.departmentEmployeeId == id);
            _context.DepartmentEmployee.Remove(departmentEmployee);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DepartmentEmployeeExists(int id)
        {
            return _context.DepartmentEmployee.Any(e => e.departmentEmployeeId == id);
        }
    }
}
