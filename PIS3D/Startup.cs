using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PIS3D.Startup))]
namespace PIS3D
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
