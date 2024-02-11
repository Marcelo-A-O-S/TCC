using Api.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IPostServices postServices;
        private readonly ICommentServices commentServices;
        private readonly IUserServices userServices;

        public CommentController(IPostServices postServices, ICommentServices commentServices, IUserServices userServices)
        {
            this.postServices = postServices;
            this.commentServices = commentServices;
            this.userServices = userServices;
        }
        [HttpGet]
        [Route("GetByPostId")]
        public async Task<ActionResult> GetAllByPostId(int postId)
        {
            return Ok();
        }
    }
}
