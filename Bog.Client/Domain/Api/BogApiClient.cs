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
        Task<IEnumerable<ContentResponse>> GetArticles(int take, int skip, string filter, string include);
        Task<ContentResponse> GetArticle(Guid contentId);
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
            return await GetArticles(take, skip, null, null);
        }

        public async Task<IEnumerable<ContentResponse>> GetArticles(int take, int skip, string filter, string include)
        {
            var requestPath = $"api/content/{_contentConfiguration.BogId}";
            var pathAndQuery = QueryHelpers.AddQueryString(requestPath, new Dictionary<string, string>()
            {
                {"take", $"{take}"},
                {"skip", $"{skip}"},
                {"filter", $"{filter}"},
                {"include", $"{include}"},
            });
            var request = new HttpRequestMessage(HttpMethod.Get, pathAndQuery);
            var response = await SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Error retrieving articles for route {pathAndQuery} : {response.StatusCode}");
            }

            var msgContent = await response.Content.ReadAsStringAsync();
            var searchArticles = JsonSerializer.Deserialize<IEnumerable<ContentResponse>>(msgContent, _jsonOptions);
            return searchArticles;
        }

        public async Task<ContentResponse> GetArticle(Guid contentId)
        {
            var requestPath = $"api/content/article/{contentId}";

            var request = new HttpRequestMessage(HttpMethod.Get, requestPath);
            var response = await SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Error retrieving article {requestPath} : {response.StatusCode}");
            }

            var msgContent = await response.Content.ReadAsStringAsync();
            var articleContentResponse = JsonSerializer.Deserialize<ContentResponse>(msgContent, _jsonOptions);
            return articleContentResponse;
        }
    }
}
