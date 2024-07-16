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
        public async Task AddPost(int postId, int userId){
            try
            {
                await Clients.All.SendAsync("AddPost", postId, userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddPost: {ex.Message}");
                throw;
            }
        }
        public async Task CreatePost(int userId){
            try
            {
                await Clients.All.SendAsync("CreatePost", userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddPost: {ex.Message}");
                throw;
            }
        }
        public async Task UpdatePost(int userId){
            try
            {
                await Clients.All.SendAsync("UpdatePost", userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddPost: {ex.Message}");
                throw;
            }
        }
        public async Task DeletePost(int userId){
            try
            {
                await Clients.All.SendAsync("DeletePost", userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddPost: {ex.Message}");
                throw;
            }
        }
        public async Task AddComment(int postId, string comment){
            try
            {
                await Clients.All.SendAsync("AddComment", postId,comment);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddPost: {ex.Message}");
                throw;
            }
        }
        public async Task AddAnswer(string email, string answer){
            try
            {
                await Clients.All.SendAsync("AddAnswer",email,answer);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddPost: {ex.Message}");
                throw;
            }
        }
        public async Task AddLike(int postId, int userId){
            try
            {
                Console.WriteLine($"AddLike called with postId: {postId}, userId: {userId}");
                await Clients.All.SendAsync("AddLike", postId, userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddPost: {ex.Message}");
                throw;
            }
        }
        public async Task RemoveLike(int postId, int userId){
            try
            {
                Console.WriteLine($"RemoveLike called with postId: {postId}, userId: {userId}");
                await Clients.All.SendAsync("RemoveLike", postId, userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddPost: {ex.Message}");
                throw;
            }
        }
    }
    
}