using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace src.Services
{
    public class Jwt
    {
        public string id { get; set; }
        public string auth_token { get; set; }
        public int expires_in { get; set; }
    }
}
