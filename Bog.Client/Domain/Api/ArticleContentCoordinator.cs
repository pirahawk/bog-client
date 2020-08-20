using Bog.Client.Domain.Models;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Bog.Api.Domain.Models.Http;
using Bog.Api.Domain.Values;

namespace Bog.Client.Domain.Api
{
    public interface IArticleContentCoordinator
    {
        Task<ArticleContentResult> GetArticle(Guid contentId);
    }

    public class ArticleContentCoordinator : IArticleContentCoordinator
    {
        private readonly IBogApiClient _apiClient;

        public ArticleContentCoordinator(IBogApiClient apiClient)
        {
            _apiClient = apiClient;
        }

        public async Task<ArticleContentResult> GetArticle(Guid contentId)
        {
            var articleContentResponse = await _apiClient.GetArticle(contentId);
            var articleResult = await GetArticleContent(articleContentResponse);
            return articleResult;
        }

        public async Task<ArticleContentResult> GetArticleContent(ContentResponse articleContentResponse)
        {
            var result = new ArticleContentResult
            {
                Article = articleContentResponse
            };

            if (!articleContentResponse.Links.Any())
            {
                return result;
            }

            var blobUrl = articleContentResponse.Links.FirstOrDefault(li => li.Relation == LinkRelValueObject.CONTENT_BLOB_URL);

            if (blobUrl == null || string.IsNullOrWhiteSpace(blobUrl.Href))
            {
                return result;
            }

            var httpClient = new HttpClient();
            var httRequest = new HttpRequestMessage(HttpMethod.Get, blobUrl.Href);
            var response = await httpClient.SendAsync(httRequest);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Error retrieving article content {blobUrl.Href} : {response.StatusCode}");
            }

            var base64EncodedContent = await response.Content.ReadAsStringAsync();
            result.EncodedContent = base64EncodedContent;

            return result;
        }
    }
}