using System;
using Microsoft.AspNetCore.Mvc;
using umsfAPI.Managers;

namespace umsfAPI.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class RegistarteNewUser: ControllerBase
    {
        [HttpPost]
        [Route("RegistrateUser")]
		public bool Registrate(string username,string password, string role)
        {
            return RegisterManager.RegNewUser(username, password, role);
        }
	}
}

