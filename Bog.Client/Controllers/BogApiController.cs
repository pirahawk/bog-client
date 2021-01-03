using System;
using System.Net;
using System.Threading.Tasks;
using Bog.Client.Domain.Api;
using Microsoft.AspNetCore.Mvc;

namespace Bog.Client.Controllers
{
    [ApiController]
    public class BogApiController : ControllerBase
    {
        private readonly IPaginatedContentCoordinator _paginatedContentCoordinator;
        private readonly IArticleContentCoordinator _articleContentCoordinator;

        public BogApiController(IPaginatedContentCoordinator paginatedContentCoordinator, IArticleContentCoordinator articleContentCoordinator)
        {
            _paginatedContentCoordinator = paginatedContentCoordinator;
            _articleContentCoordinator = articleContentCoordinator;
        }

        [HttpGet]
        [Route("api/{page:int}")]
        public async Task<IActionResult> GetPaginatedContent([FromRoute] int page)
        {
            var allContent = await _paginatedContentCoordinator.GetContent(page);
            return Ok(allContent);
        }

        [HttpGet]
        [Route("api/article/{contentId:guid}/")]
        [Route("api/article/{contentId:guid}/{title}")]
        public async Task<IActionResult> GetArticle([FromRoute] Guid contentId)
        {
            var articleContent = await _articleContentCoordinator.GetArticle(contentId);
            
            if (articleContent == null)
            {
                return NotFound();
            }
            
            return Ok(articleContent);
        }
    }
}