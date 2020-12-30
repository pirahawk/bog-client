using Bog.Client.Domain.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Bog.Client.Controllers
{
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        private readonly SiteConfiguration _siteConfiguration;

        public ConfigurationController(IOptions<SiteConfiguration> siteConfiguration)
        {
            _siteConfiguration = siteConfiguration.Value;
        }

        [HttpGet]
        [Route("config")]
        public IActionResult GetConfiguration()
        {
            return Ok(_siteConfiguration);
        }
    }
}