using System;
using System.Collections.Generic;
using System.IO;

namespace umsfAPI.Managers
{
	public static class DeleteUserManager
	{
        public static void DeleteUser(string username)
        {
            var file = new List<string>(File.ReadAllLines("users.txt"));
            bool found = false;

            for (int i = 0; i < file.Count; i++)
            {
                var split = file[i].Split(',',':');
                if (split[1] == username)
                {
                    file.RemoveAt(i);
                    found = true;
                    Console.WriteLine("User deleted successfully.");
                    break;
                }
            }

            if (!found)
            {
                Console.WriteLine("User not found.");
            }

            File.WriteAllLines("users.txt", file.ToArray());
        }

    }
}

