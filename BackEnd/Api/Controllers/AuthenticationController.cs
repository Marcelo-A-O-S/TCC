using Api.Models;
using Api.Services.Interfaces;
using Api.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserServices userServices;

        public AuthenticationController(IUserServices userServices)
        {
            this.userServices = userServices;
        }
        [HttpGet]
        public ActionResult Get()
        {
            return Ok();
        }
        [HttpPost("Login")]
        public async Task<ActionResult> Login(LoginViewModel request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var match = await this.userServices.VerifyUserExistsByEmail(request.email);
                    if(match != false)
                    {
                        var user = await this.userServices.GetByEmail(request.email);
                        if (user.password.Equals(request.password))
                        {
                            var userview = new UserViewModel();
                            userview.email = user.email;
                            userview.username = user.username;
                            return Ok(userview);
                        }
                        return BadRequest("Dados inválidos, corrija e tente novamente!");

                    }
                    return BadRequest("Email não corresponde a nenhum usuário, corrija o email e tente novamente ou registre-se!");
                }
                var erros = ModelState.Values.SelectMany(x => x.Errors);
                return BadRequest(erros);
            }catch(Exception err)
            {
                return BadRequest(err.Message);
            }
        }
        [HttpPost("Register")]
        public async Task<ActionResult> Register(RegisterViewModel request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var match = await this.userServices.VerifyUserExistsByEmail(request.email);
                    if(match != true)
                    {
                        var user = new User();
                        user.email = request.email;
                        user.username = request.username;
                        user.password = request.password;
                        await this.userServices.Save(user);
                        return Ok("Registro realizado com sucesso");
                    }
                    return BadRequest("Dados Inválidos!");
                }
                var erros = ModelState.Values.SelectMany(x => x.Errors);
                return BadRequest(erros);
            }
            catch(Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}
