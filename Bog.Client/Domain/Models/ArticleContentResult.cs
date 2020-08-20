using Bog.Api.Domain.Models.Http;

namespace Bog.Client.Domain.Models
{
    public class ArticleContentResult
    {
        public ContentResponse Article { get; set; }
        public string EncodedContent { get; set; }
    }
}