using Api.Services;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;


namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : Controller
    {
        private readonly INotificationServices notificationServices;
        private readonly IHubContext<NotificationHubService> notificationHubContext;

        public NotificationController(
            INotificationServices notificationServices,
            IHubContext<NotificationHubService> notificationHubContext
            )
        {
            this.notificationServices = notificationServices;
            this.notificationHubContext = notificationHubContext;
        }

        [Authorize]
        [HttpGet, Route("List")]
        public async Task<ActionResult> GetNotifications(){
            return Ok();
        }
        [Authorize]
        [HttpGet, Route("ListByUserId")]
        public async Task<ActionResult> GetNotficationsByUserId(int userId){
            
            var notifications = await this.notificationServices.FindByUserIdDescending(userId);
            return Ok(notifications);
        }
        [Authorize]
        [HttpDelete, Route("DeleteById")]
        public async Task<ActionResult> DeleteNotificationById(int Id){
            await this.notificationServices.DeleteById(Id);
            return Ok("Deletado com sucesso!");
        }
    }
}