using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace src.Models
{
    public class DepartmentEmployee
    {
        public int departmentEmployeeId { get; set; }
        public string description { get; set; }

        public int departmentId { get; set; }
        public Department department { get; set; }

        public int employeeId { get; set; }
        public Employee employee { get; set; }
    }
}
