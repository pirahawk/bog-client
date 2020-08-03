using Microsoft.AspNetCore.Mvc;

namespace Bog.Client.Controllers
{
    public class BogClientController : Controller
    {
        [Route("")]
        public IActionResult Index()
        {
            return View("Client");
        }
    }
}
