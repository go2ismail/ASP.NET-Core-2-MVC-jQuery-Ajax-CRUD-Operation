using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using src.Models;
using src.Services;

namespace src.Controllers.api
{
    [AllowAnonymous]
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class TokenController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public TokenController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet]
        public async Task<String> RequestToken()
        {
            //todo: implement refresh token
            var token = "";
            if (_signInManager.IsSignedIn(User))
            {
                ApplicationUser usr = await _userManager.GetUserAsync(HttpContext.User);
                if (usr != null) token = usr.accessToken;
            }
            return token;
        }
    }
}