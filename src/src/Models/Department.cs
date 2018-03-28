using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace src.Models
{
    public class Department
    {
        public int departmentId { get; set; }
        [Required]
        [StringLength(100)]
        public string name { get; set; }
        [StringLength(200)]
        public string description { get; set; }

        public ICollection<DepartmentEmployee> departmentEmployee { get; set; }
    }
}
