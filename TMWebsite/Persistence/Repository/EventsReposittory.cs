using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TMWebsite.Models;
namespace TMWebsite.Persistence.Repository
{
    public class EventsReposittory : Repository<Event>
    {
        public EventsReposittory(ApplicationDbContext context) : base(context)
        {
        }        
    }
}