using Bog.Client.Domain.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Bog.Client.Controllers
{
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        private readonly SiteConfiguration _siteConfiguration;
        private MenuConfiguration _menuConfiguration;

        public ConfigurationController(IOptions<SiteConfiguration> siteConfiguration, IOptions<MenuConfiguration> menuConfiguration)
        {
            _siteConfiguration = siteConfiguration.Value;
            _menuConfiguration = menuConfiguration.Value;
        }

        [HttpGet]
        [Route("config")]
        public IActionResult GetConfiguration()
        {
            return Ok(_siteConfiguration);
        }

        [HttpGet]
        [Route("menuConfig")]
        public IActionResult GetMenuConfiguration()
        {
            return Ok(_menuConfiguration);
        }
    }
}