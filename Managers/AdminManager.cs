using System;
using System.Collections.Generic;
using System.IO;
using umsfAPI.Models;

namespace umsfAPI.Managers
{
	public static class AdminManager
	{
        public static void DeleteUser(string username)
        {
            var file = new List<string>(File.ReadAllLines("users.txt"));
            bool found = false;

            for (int i = 0; i < file.Count; i++)
            {
                var split = file[i].Split(',', ':');
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

        public static void UpdateUser(string username, string newRole)
        {
            try
            {
                string[] lines = File.ReadAllLines("users.txt");
                for (int i = 0; i < lines.Length; i++)
                {
                    if (lines[i].StartsWith("UsaerName:" + username + ","))
                    {
                        lines[i] = "UsaerName:" + username + "," + lines[i].Split(',')[1] + ",Role:" + newRole;
                        break;
                    }
                }
                File.WriteAllLines("users.txt", lines);
            }
            catch (FileNotFoundException e)
            {
                Console.WriteLine($"Файл не найден: {e.Message}");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Ошибка при обновлении роли: {e.Message}");
            }
        }
        public static List<User> GetUsers()
        {
            List<User> tempList = new List<User>();
            try
            {
                string[] lines = File.ReadAllLines("users.txt");
                for (int i = 0; i < lines.Length; i++)
                {
                    var mas = lines[i].Split(',', ':');
                    tempList.Add(new User(mas[1], mas[3], mas[5]));
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
            return tempList;
        }
    }
}

