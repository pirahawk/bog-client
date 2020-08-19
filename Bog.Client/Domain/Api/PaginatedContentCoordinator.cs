using System.Collections.Generic;
using System.Threading.Tasks;
using Bog.Api.Domain.Models.Http;
using Bog.Client.Domain.Configuration;
using Microsoft.Extensions.Options;

namespace Bog.Client.Domain.Api
{
    public interface IPaginatedContentCoordinator
    {
        Task<IEnumerable<ContentResponse>> GetContent(int page);
    }

    public class PaginatedContentCoordinator : IPaginatedContentCoordinator
    {
        private readonly IBogApiClient _apiClient;
        private readonly ContentConfiguration _contentConfiguration;

        public PaginatedContentCoordinator(IBogApiClient apiClient, IOptions<ContentConfiguration> contentConfiguration)
        {
            _apiClient = apiClient;
            _contentConfiguration = contentConfiguration.Value;
        }

        public async Task<IEnumerable<ContentResponse>> GetContent(int page)
        {
            int take = _contentConfiguration.Take;
            int skip = page * take;

            var result = await _apiClient.GetArticles(take, skip, _contentConfiguration.Filter, _contentConfiguration.Include);
            return result;
        }
    }
}