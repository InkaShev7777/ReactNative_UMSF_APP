using System;
using System.Collections.Generic;
using System.IO;
using umsfAPI.Models;

namespace umsfAPI.Managers
{
	public class QuestionsManager
	{
		List<Question> questions;
		public QuestionsManager()
		{
			this.questions = new List<Question>();
		}

		public List<Question> GetAllQuestions()
		{
            try
            {
                string[] lines = File.ReadAllLines("questions.txt");
                for (int i = 0; i < lines.Length; i++)
                {
                    var mas = lines[i].Split(',');
                    this.questions.Add(new Question(mas[0], mas[1]));
                }
            }
            catch (FileNotFoundException e)
            {
                Console.WriteLine($"Файл не найден: {e.Message}");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Ошибка при обновлении роли: {e.Message}");
            }
            return this.questions;
        }
	}
}

