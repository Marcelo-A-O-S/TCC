using Microsoft.AspNetCore.SignalR;
namespace Api.Services
{
    public class NotificationHubService : Hub
    {
        public override async Task OnConnectedAsync(){
            await Clients.All.SendAsync("OnConnected",$"{Context.ConnectionId}: Conectou ao chat");
            await base.OnConnectedAsync();
        }
        public async Task SendMessage(string email, string message){
            await Clients.All.SendAsync("ReceiveMessage",email, message);
        }
        public async Task AddComment(int postId, string comment){
            await Clients.All.SendAsync("AddComment", postId,comment);
        }
        public async Task AddAnswer(string email, string answer){
            await Clients.All.SendAsync("AddAnswer",email,answer);
        }
        public async Task AddLike(int postId, int userId){
            await Clients.All.SendAsync("AddLike", postId, userId);
        }
        public async Task AddPost(int postId, int userId){
            await Clients.All.SendAsync("AddPost", postId, userId);
        }
        public async Task CreatePost(int userId){
            await Clients.All.SendAsync("CreatePost", userId);
        }
        
    }
    
}