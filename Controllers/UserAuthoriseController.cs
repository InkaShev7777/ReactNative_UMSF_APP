using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using umsfAPI.Managers;

namespace umsfAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserAuthoriseController : ControllerBase
    {
        private AuthorizeManager authorizeManager;
		public UserAuthoriseController()
		{
            this.authorizeManager = new AuthorizeManager();
		}
        [HttpPost]
        [Route("Authorize")]
		public string Authorize(string name,string password)
        {
            string result = this.authorizeManager.Authorize(name, password);
            if (result == "User")
            {
                Loger.LogAction("User: " + name + " authorized");
            }
            return result;
        }
    }
}

