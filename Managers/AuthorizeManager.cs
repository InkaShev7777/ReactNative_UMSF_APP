using System;
using System.IO;

namespace umsfAPI.Managers
{
	public class AuthorizeManager
	{
		public AuthorizeManager()
		{
		}

        public string Authorize(string username, string password)
        {
            try
            {
                if (File.Exists("users.txt"))
                {
                    var lines = File.ReadAllLines("users.txt");
                    foreach (var line in lines)
                    {
                        var split = line.Split(',', ':');
                        if (split[1] == username && split[3] == password)
                        {
                            return "User:" + username;
                        }
                    }
                }
                if(username == "Admin" && password == "Admin123")
                {
                    return "Admin";
                }
            }
            catch (Exception e){}
            return "Nothing";
        }
    }
}

