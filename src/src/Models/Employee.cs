using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace src.Models
{
    public class Employee
    {
        public Int32 employeeId { get; set; }
        [Required]
        [StringLength(100)]
        public string fullName { get; set; }
        [StringLength(200)]
        public string address { get; set; }
    }
}
