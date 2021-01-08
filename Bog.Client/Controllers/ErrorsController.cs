using Bog.Client.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bog.Client.Controllers
{
    public class ErrorsController : Controller
    {
        [HttpGet]
        [Route("error/{errorCode:int}")]
        public IActionResult ShowError([FromRoute] int errorCode)
        {
            return View("ShowError", new ErrorResult
            {
                ErrorCode = errorCode,
                Description = errorCode == 404? $"{errorCode} - Page Not Found" : $"{errorCode}  - Something went wrong!"
            });
        }
    }
}