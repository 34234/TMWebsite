using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace TMWebsite.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
        public DateTime BirthDate { get; set; }
        [MaxLength(10)]
        public string Sub_Id { set; get; }
        [MaxLength(10)]
        public string Dep_Id { set; get; }
        [MaxLength(200)]
        public string Full_Name { set; get; }
        [MaxLength(15)]
        public string Mobile { set; get; }
        public virtual List<Event> Events { set;get;}


    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<SubDivision> SubDivisions { get; set; }
        public DbSet<Deparment> Deparments { get; set; }
        public DbSet<Event> Events { set; get; }
        public DbSet<GroupEvent> GroupEvents { set; get; }
        public DbSet<ResultEvent> ResultEvents { set; get; }
        public DbSet<Result_URL> Result_URLs { set; get; }
        
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}