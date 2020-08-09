using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Bog.Api.Domain.Models.Http;
using Bog.Client.Domain.Configuration;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;

namespace Bog.Client.Domain.Api
{
    public interface IBogApiClient
    {
        Task<IEnumerable<ContentResponse>> GetArticles(int take, int skip);
    }

    public class BogApiClient : HttpClient, IBogApiClient
    {
        private readonly JsonSerializerOptions _jsonOptions;
        private readonly ContentConfiguration _contentConfiguration;

        public BogApiClient(JsonSerializerOptions jsonOptions, IOptions<ContentConfiguration> contentConfiguration)
        {
            _jsonOptions = jsonOptions;
            _contentConfiguration = contentConfiguration.Value;
        }

        public async Task<IEnumerable<ContentResponse>> GetArticles(int take, int skip)
        {
            var requestPath = $"api/content/{_contentConfiguration.BogId}";
            //var builder = new UriBuilder($"api/content/{_contentConfiguration.BogId}");
            var pathAndQuery = QueryHelpers.AddQueryString(requestPath, new Dictionary<string,string>()
            {
                {"take", $"{take}"},
                {"skip", $"{skip}"}
            });
            var request = new HttpRequestMessage(HttpMethod.Get, pathAndQuery);
            var response = await this.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Error retrieving articles for route {pathAndQuery}");
            }

            var msgContent = await response.Content.ReadAsStringAsync();
            var searchArticles = JsonSerializer.Deserialize<IEnumerable<ContentResponse>>(msgContent, _jsonOptions);
            return searchArticles;
        }
    }
}
