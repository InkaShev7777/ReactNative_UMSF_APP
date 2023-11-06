using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using umsfAPI.Managers;
using umsfAPI.Models;

namespace umsfAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class QuestionsController: ControllerBase
	{
		private QuestionsManager questionsManager;
		public QuestionsController()
		{
			this.questionsManager = new QuestionsManager();
		}
		[HttpGet]
		[Route("GetAllGuestions")]
		public List<Question> GetQuestions()
		{
			return this.questionsManager.GetAllQuestions();
		}
	}
}

