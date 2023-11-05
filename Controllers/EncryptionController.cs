using System;
using Microsoft.AspNetCore.Mvc;
using umsfAPI.Managers;

namespace umsfAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class EncryptionController:ControllerBase
	{
		//
		// ? return result 
		//
		[HttpPost]
		[Route("Encrypt")]
		public void Encrypt(string input)
		{
			EncryptionManager.Encrypt(input);
		}
        [HttpPost]
        [Route("Decrypt")]
        public void Decrypt()
		{
			EncryptionManager.Decrypt();
		}
		[HttpGet]
		[Route("GetCloseData")]
		public string GetCloseData()
		{
			return EncryptionManager.GetCloseData();
		}
        [HttpGet]
        [Route("GetOutData")]
        public string GetOutData()
        {
			return EncryptionManager.GetOutData();
        }
    }
}

