using System.Collections.Generic;
using Bog.Api.Domain.Models.Http;

namespace Bog.Client.Domain.Models
{
    public class PaginatedContentResult
    {
        public int Page { get; set; }
        public IEnumerable<ContentResponse> Content { get; set; }
    }
}