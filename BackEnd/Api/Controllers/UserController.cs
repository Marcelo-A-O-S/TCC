using Api.Models;
using Api.Services.Interfaces;
using Api.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices userServices;

        public UserController(IUserServices userServices)
        {
            this.userServices = userServices;
        }
        [Authorize]
        [HttpGet, Route("GetByEmail")]
        public async Task<ActionResult<UserViewModel>> GetByEmail(string email)
        {
            User user = await this.userServices.GetByEmail(email);
            var userview = new UserViewModel();
            userview.name = user.username;
            userview.email = user.email;
            userview.Id = user.Id;
            return Ok(userview);
        }
    }
}
