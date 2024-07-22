using Api.DTOs;
using Api.Models;
using Api.Services;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;


namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : Controller
    {
         private readonly IPostServices postServices;
        private readonly IUserServices userServices;
        private readonly ICommentServices commentServices;
        private readonly IAnswerServices answerServices;
        private readonly IImageServices imageServices;
        private readonly ILikeServices likeServices;
        private readonly INotificationServices notificationServices;
        private readonly IHubContext<NotificationHubService> notificationHubContext;

        public AnswerController(
            IPostServices postServices, 
            IUserServices userServices, 
            ICommentServices commentServices,
            IAnswerServices answerServices,
            IImageServices imageServices,
            ILikeServices likeServices,
            INotificationServices notificationServices,
            IHubContext<NotificationHubService> notificationHubContext
            )
        {
            this.postServices = postServices;
            this.userServices = userServices;
            this.commentServices = commentServices;
            this.answerServices = answerServices;
            this.imageServices = imageServices;
            this.likeServices = likeServices;
            this.notificationServices = notificationServices;
            this.notificationHubContext = notificationHubContext;
        }
         [Authorize]
        [HttpPost, Route("AddAnswer")]
        public async Task<ActionResult> AddAnswer(AnswerDTO answerRequest)
        {
            Comment comment = await this.commentServices.FindById(answerRequest.commentId);
            Answer answer = new Answer();
            if(answerRequest.Id != 0){
                answer.Id = answerRequest.Id;
                answer.answer = answerRequest.answer;
                var user = await this.userServices.FindById(answerRequest.userId);
                if(user != null){
                    answer.userId = user.Id;
                }
                var commentCurrent = await this.commentServices.FindById(answerRequest.commentId);
                if(commentCurrent != null ){
                    answer.commentId = commentCurrent.Id;
                }
                await this.answerServices.Save(answer);
                var notification = await this.notificationServices.FindByAnswerId(answerRequest.Id);
                notification.dateCreate = DateTime.Now;
                await this.notificationServices.Save(notification);
                await this.notificationHubContext.Clients.All.SendAsync("UpdateAnswer",notification.postsId, answer.userId);
                return Ok("Atualzado com sucesso!");
                
            }else{
                answer.Id = 0;
                answer.answer = answerRequest.answer;
                var user = await this.userServices.FindById(answerRequest.userId);
                if(user != null){
                    answer.userId = user.Id;
                }
                var commentCurrent = await this.commentServices.FindById(answerRequest.commentId);
                if(commentCurrent != null ){
                    answer.commentId = commentCurrent.Id;
                }
                await this.answerServices.Save(answer);
                return Ok("Salvo com sucesso!");
                
            }
            
        }
        [Authorize]
        [HttpPut, Route("UpdateAnswer")]
        public async Task<ActionResult> UpdateAnswer(AnswerDTO answerRequest)
        {
            Answer answer = await this.answerServices.FindById(answerRequest.Id);
            answer.answer = answerRequest.answer;
            await this.answerServices.Save(answer);
            var notification = await this.notificationServices.FindByAnswerId(answerRequest.Id);
            await this.notificationHubContext.Clients.All.SendAsync("UpdateAnswer",notification.postsId, answer.userId);
            return Ok("O Comentário foi atualizado com sucesso!");
        }
        [Authorize]
        [HttpDelete, Route("DeleteAnswer")]
        public async Task<ActionResult> DeleteAnswer(AnswerDTO answerRequest)
        {
            Answer answer = await this.answerServices.FindById(answerRequest.Id);
            try{
                await this.answerServices.Delete(answer);
                var notification = await this.notificationServices.FindByAnswerId(answerRequest.Id);
                await this.notificationServices.Delete(notification);
                await this.notificationHubContext.Clients.All.SendAsync("DeleteAnswer",notification.postsId, answer.userId);
                return Ok("Comentário deletado com sucesso");
                
            }catch(Exception err){
                return BadRequest(err.Message);
            }
        }
        [Authorize]
        [HttpDelete,Route("DeleteAnswerById")]
        public async Task<ActionResult> DeleteAnswerById(int answerId){
            Answer answer = await this.answerServices.FindById(answerId);
            try{
                await this.answerServices.Delete(answer);
                var notification = await this.notificationServices.FindByAnswerId(answerId);
                await this.notificationServices.Delete(notification);
                await this.notificationHubContext.Clients.All.SendAsync("DeleteAnswer",notification.postsId, answer.userId);
                return Ok("Comentário deletado com sucesso");
            }catch(Exception err){
                return BadRequest(err.Message);
            }
            
        }
    }
}