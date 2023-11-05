using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using umsfAPI.Managers;
using umsfAPI.Models;

namespace umsfAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        [HttpPost]
        [Route("DeleteUser")]
        public void DeleteUserByName(string username)
        {
            AdminManager.DeleteUser(username);
        }
        [HttpPost]
        [Route("UpdateUser")]
        public void UpdateUser(string username,string newRole)
        {
            AdminManager.UpdateUser(username, newRole);
        }
        [HttpGet]
        [Route("GetAllListUsers")]
        public List<User> GetUsers()
        {
            return AdminManager.GetUsers();
        }
    }
}

