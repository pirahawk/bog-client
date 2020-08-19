using System;
using System.Threading.Tasks;
using Bog.Client.Domain.Api;
using Bog.Client.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bog.Client.Controllers
{
    public class BogClientController : Controller
    {
        private readonly IPaginatedContentCoordinator _paginatedContentCoordinator;
        public BogClientController(IPaginatedContentCoordinator paginatedContentCoordinator)
        {
            _paginatedContentCoordinator = paginatedContentCoordinator;
        }

        [HttpGet]
        [Route("")]
        [Route("{page:int}")]
        public async Task<IActionResult> GetPaginatedContent([FromRoute]int page)
        {
            var allContent =  await _paginatedContentCoordinator.GetContent(page);
            return View("PaginatedContent", new PaginatedContentResult
            {
                Page = page,
                Content = allContent
            });
        }

        [HttpGet]
        [Route("article/{contentId:guid}")]
        public async Task<IActionResult> GetArticle([FromRoute]Guid contentId)
        {
            return View("Client");
        }
    }
}
