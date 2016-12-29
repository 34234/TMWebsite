using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TMWebsite.Models
{
    public class SubDivision
    {
        [Key]
        public int Id { set; get; }
        [MaxLength(150)]
        public String Name { set; get; }
        public List<ApplicationUser> ApplicationUsers { set; get; }
        public List<Deparment> Deparments { set; get; }

    }

    public class Deparment
    {
        [Key]
        public int Id { set; get; }
        [MaxLength(150)]
        public String Name { set; get; }
        public virtual List<ApplicationUser> ApplicationUser { set; get; }
    }

    public class Event
    {
        [Key]
        public int Id { set; get; }
        [MaxLength(150)]
        public string Name { set; get; }
        public string Detail { set; get; }
        public DateTime Begin_Date { set; get; }
        public DateTime End_Date { set; get; }
        public GroupEvent Group { set; get; }
        public virtual List<ApplicationUser> ApplicationUsers { set; get; }
    }

    public class GroupEvent
    {
        [Key]
        public int Id { set; get; }
        [MaxLength(150)]
        public string Name { set; get; }
        public string Detail { set; get; }
        public virtual List<Event> Events { set; get; }
    }

    public class ResultEvent
    {
        [Key]
        public int Id { set; get; }        
        public string DetailText { set; get; }
        public virtual List<Result_URL> Result_URLs { set; get; }

    }

    public class Result_URL
    {
        public int Id { set; get; }
        [MaxLength(150)]
        public string Url { set; get; }
        public ResultEvent ResultEvent { set; get; }
    }



}