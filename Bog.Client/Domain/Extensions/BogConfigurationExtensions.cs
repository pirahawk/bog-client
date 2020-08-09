using Bog.Client.Domain.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Bog.Client.Domain.Extensions
{
    public static class BogConfigurationExtensions
    {
        public static void WithBogConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<BogApiConnectionConfiguration>(configuration.GetSection("BogApiConnectionConfiguration"));
            services.Configure<ContentConfiguration>(configuration.GetSection("ContentConfiguration"));
        }
    }
}