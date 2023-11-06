using System;
using System.Collections.Generic;
using System.Runtime.ConstrainedExecution;
using System.Xml.Linq;
using umsfAPI.Models;

namespace umsfAPI.Managers
{
	public class LowerAccessRights
	{
		private List<User> users;
		public LowerAccessRights()
		{
			this.users = AdminManager.GetUsers();
		}

		public void LowAccess(string name)
		{
			foreach(var user in users)
			{
				if (user.UserName.Equals(name))
				{
					if (user.role.Equals("E"))
					{
						AdminManager.UpdateUser(name, "W");
					}
					else if (user.role.Equals("W"))
					{
                        AdminManager.UpdateUser(name, "R");
                    }
                    else if (user.role.Equals("R"))
                    {
                        AdminManager.UpdateUser(name, "K");
                    }
                }
			}
		}
		public string GetRole(string username)
		{
			string role = "";
			foreach (var user in users)
			{
				if (user.UserName.Equals(username))
				{
					role = user.role;
				}
			}
			return role;
		}
	}
}

