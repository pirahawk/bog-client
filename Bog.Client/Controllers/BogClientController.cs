using System.Threading.Tasks;
using Bog.Client.Domain.Api;
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

        [Route("")]
        public async Task<IActionResult> Index()
        {
             await _paginatedContentCoordinator.GetContent(0);
            return View("Client");
        }
    }
}
