using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace TMWebsite.Models
{
	public class DbContext:ApplicationDbContext
	{
        public DbSet<SubDivision> SubDivisions { get; set; }
        public DbSet<Deparment> Deparments { get; set; }        		
		public DbSet<Event> Event { set; get; }
		public DbSet<GroupEvent> GroupEvent { set; get; }

    }
}