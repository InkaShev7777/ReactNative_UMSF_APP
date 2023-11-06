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
        private LowerAccessRights setRole;
        public AdminController()
        {
            setRole = new LowerAccessRights();
        }
        //
        //  GET
        //
        [HttpGet]
        [Route("GetAllListUsers")]
        public List<User> GetUsers()
        {
            return AdminManager.GetUsers();
        }
        [HttpGet]
        [Route("GetRole")]
        public string GetRole(string username)
        {
            return setRole.GetRole(username);
        }
        //
        //  POST
        //
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
        [HttpPost]
        [Route("LowRole")]
        public void LowRole(string username)
        {
            this.setRole.LowAccess(username);
        }
    }
}

