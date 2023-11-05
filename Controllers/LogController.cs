using System;
using Microsoft.AspNetCore.Mvc;
using umsfAPI.Managers;

namespace umsfAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class LogController:ControllerBase
	{
		[HttpPost]
		[Route("AddNewLog")]
		public void NewLog(string action)
		{
			Loger.LogAction(action);
		}
	}
}

