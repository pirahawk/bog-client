using Bog.Client.Domain.Api;
using Microsoft.Extensions.DependencyInjection;

namespace Bog.Client.Domain.Extensions
{
    public static class BogServicesExtensions
    {
        public static void WithBogApiServices(this IServiceCollection services)
        {
            services.AddTransient<IPaginatedContentCoordinator,PaginatedContentCoordinator>();
            services.AddTransient<IArticleContentCoordinator, ArticleContentCoordinator>();

        }
    }
}