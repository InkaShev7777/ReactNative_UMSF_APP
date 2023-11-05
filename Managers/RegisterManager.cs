using System;
using System.Data;
using System.IO;
using System.Threading;
using umsfAPI.Models;
using static System.Net.Mime.MediaTypeNames;

namespace umsfAPI.Managers
{
	public static class RegisterManager
	{
        private static int maxCountUsers = 15;
		private static User newUser;

		public static bool RegNewUser(string username, string password, string role)
		{
            string assemblyFolder = Path.GetDirectoryName(AppDomain.CurrentDomain.BaseDirectory);
            newUser = new User(username, password, role);
            try
            {
                if (File.Exists("users.txt"))
                {
                    using (StreamReader file = new StreamReader("users.txt"))
                    {
                        string line;
                        while ((line = file.ReadLine()) != null)
                        {
                            Console.WriteLine(line);
                            var split = line.Split(',', ':');
                            if (split[1] == username)
                            {
                                return false;
                            }
                        }
                    }
                    using (StreamWriter file2 = new StreamWriter("users.txt", true))
                    {
                        file2.WriteLine(newUser.ToString());
                        return true;
                    }
                }
                else
                {
                    using (StreamWriter file2 = new StreamWriter("users.txt", true))
                    {
                        file2.WriteLine(newUser.ToString());
                        return true;
                    }
                }
            }
            catch(Exception ex)
            {
                return false;
            }
               
        }
    }
}

