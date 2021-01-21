using System;
using System.Linq;
using System.Threading.Tasks;
using Bog.Client.Domain.Api;
using Bog.Client.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bog.Client.Controllers
{
    public class BogClientController : Controller
    {
        private readonly IPaginatedContentCoordinator _paginatedContentCoordinator;
        private readonly IArticleContentCoordinator _articleContentCoordinator;

        public BogClientController(IPaginatedContentCoordinator paginatedContentCoordinator, IArticleContentCoordinator articleContentCoordinator)
        {
            _paginatedContentCoordinator = paginatedContentCoordinator;
            _articleContentCoordinator = articleContentCoordinator;
        }

        [HttpGet]
        [Route("")]
        [Route("{page:int}")]
        public async Task<IActionResult> GetPaginatedContent([FromRoute]int page)
        {
            try
            {
                var allContent = await _paginatedContentCoordinator.GetContent(page);

                if (page > 0 && (allContent == null || !allContent.Any()))
                {
                    return RedirectToAction("GetPaginatedContent", "BogClient", new { page = 0 });
                }

                return View("PaginatedContent", new PaginatedContentResult
                {
                    Page = page,
                    Content = allContent
                });
            }
            catch (Exception)
            {
                return RedirectToAction("ShowError", "Errors", new { errorCode = 404 });
            }
        }

        [HttpGet]
        [Route("article/{contentId:guid}/")]
        [Route("article/{contentId:guid}/{title}")]
        public async Task<IActionResult> GetArticle([FromRoute]Guid contentId)
        {
            try
            {
                var articleContent = await _articleContentCoordinator.GetArticle(contentId);

                if (articleContent == null)
                {
                    RedirectToAction("ShowError", "Errors", new { errorCode = 404 });
                }
                
                return View("ArticleContent", articleContent);
            }
            catch (Exception)
            {
                return RedirectToAction("ShowError", "Errors", new { errorCode = 404 });
            }
        }
    }
}
