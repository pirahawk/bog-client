using System;
using System.Text.Json;
using Bog.Client.Domain.Api;
using Bog.Client.Domain.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Bog.Client.Domain.Extensions
{
    public static class BogApiClientConfigurationExtensions
    {
        public static void WithBogApiClient(this IServiceCollection services)
        {
            services.AddTransient<IBogApiClient,BogApiClient>(sp =>
            {
                var apiConfigurationOptions = sp.GetService<IOptions<BogApiConnectionConfiguration>>();
                var contentConfiguration = sp.GetService<IOptions<ContentConfiguration>>();

                var apiConfiguration = apiConfigurationOptions.Value;

                if (apiConfiguration == null)
                {
                    throw new ArgumentException($"Could not find MarkdownConverterConfiguration to create HTTP Client");
                }

                var uriBuilder = new UriBuilder()
                {
                    Scheme = apiConfiguration.Scheme,
                    Host = apiConfiguration.Host,
                };

                if (int.TryParse(apiConfiguration.Port, out var port))
                {
                    uriBuilder.Port = port;
                }

                var jsonOptions = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    IgnoreNullValues = true,
                    AllowTrailingCommas = true,
                    WriteIndented = true
                };

                var apiClient = new BogApiClient(jsonOptions, contentConfiguration);
                apiClient.BaseAddress = uriBuilder.Uri;

                return apiClient;
            });
        }
    }
}