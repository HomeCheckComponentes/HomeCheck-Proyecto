using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using homecheck_be.DatabaseSettings;
using homecheck_be.Services;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Server.IISIntegration;

namespace homecheck_be
{
    public class Startup
    {


        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(
                  "CorsPolicy",
                  builder => builder
                  .WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .SetIsOriginAllowed(host => true)
                  .AllowCredentials());
            });
            //services.AddAuthentication(IISDefaults.AuthenticationScheme);


            services.Configure<DatabaseSetting>(
                Configuration.GetSection(nameof(DatabaseSetting)));


            services.AddSingleton<IDatabaseSetting>(sp =>
                sp.GetRequiredService<IOptions<DatabaseSetting>>().Value);
            services.AddSingleton<FamiliaService>();
            services.AddSingleton<BookService>();
            services.AddSingleton<UsuarioService>();
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseCors("CorsPolicy");
            app.UseMiddleware<CorsMiddleware>();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseRouting();

            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
