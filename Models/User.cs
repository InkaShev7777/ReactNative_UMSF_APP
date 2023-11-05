using System;
namespace umsfAPI.Models
{
	public class User
	{
        public string UserName { get; set; }
        public string Password { get; set; }
        public string role { get; set; }

        public User(string userName, string password, string role)
        {
            this.UserName = userName;
            this.Password = password;
            this.role = role;
        }

        public override string ToString()
        {
            return "UsaerName:" + this.UserName + ",Password:" + this.Password + ",Role:" + this.role;
        }

    }
}

