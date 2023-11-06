using System;
namespace umsfAPI.Models
{
	public class Question
	{
		public string questiontext { get; set; }
        public string answer { get; set; }
        public Question( string question, string answer)
		{
			this.questiontext = question;
			this.answer = answer;
		}

        public override string ToString()
        {
            return "Question: " + this.questiontext + " Answer: " + this.answer;
        }
    }
}

