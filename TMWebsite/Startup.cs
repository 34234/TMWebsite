using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TMWebsite.Startup))]
namespace TMWebsite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
