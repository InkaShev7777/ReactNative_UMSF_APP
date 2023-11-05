using System;
using System.IO;

namespace umsfAPI.Managers
{
	public static class Loger
	{
        public static void LogAction(string action)
        {
            using (StreamWriter file = new StreamWriter("us_book.txt", true))
            {
                file.WriteLine($"{DateTime.Now}: {action}");
            }
        }
    }
}

