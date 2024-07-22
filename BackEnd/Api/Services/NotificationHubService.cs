using Microsoft.AspNetCore.SignalR;
namespace Api.Services
{
    public class NotificationHubService : Hub
    {
        public override async Task OnConnectedAsync (){
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
                Console.WriteLine($"Error in CreatePost: {ex.Message}");
                throw;
            }
        }
        public async Task UpdatePost(int postId, int userId){
            try
            {
                await Clients.All.SendAsync("UpdatePost",postId, userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UpdatePost: {ex.Message}");
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
                Console.WriteLine($"Error in DeletePost: {ex.Message}");
                throw;
            }
        }
        public async Task AddComment(int postId, int userId){
            try
            {
                await Clients.All.SendAsync("AddComment", postId,userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddComment: {ex.Message}");
                throw;
            }
        }
        public async Task UpdateComment(int postId, int userId){
            try
            {
                await Clients.All.SendAsync("UpdateComment", postId,userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UpdateComment: {ex.Message}");
                throw;
            }
        }
        public async Task RemoveComment(int postId, int userId){
            try
            {
                await Clients.All.SendAsync("RemoveComment", postId,userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in RemoveComment: {ex.Message}");
                throw;
            }
        }
        public async Task AddAnswer(int postId, int userId){
            try
            {
                await Clients.All.SendAsync("AddAnswer",postId,userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddAnswer: {ex.Message}");
                throw;
            }
        }
        public async Task UpdateAnswer(int postId, int userId){
            try
            {
                await Clients.All.SendAsync("UpdateAnswer",postId,userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UpdateAnswer: {ex.Message}");
                throw;
            }
        }
         public async Task RemoveAnswer(int postId, int userId){
            try
            {
                await Clients.All.SendAsync("RemoveAnswer",postId,userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in RemoveAnswer: {ex.Message}");
                throw;
            }
        }
        public async Task AddLike(int postId, int userId){
            try
            {
                await Clients.All.SendAsync("AddLike", postId, userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddLike: {ex.Message}");
                throw;
            }
        }
        public async Task RemoveLike(int postId, int userId){
            try
            {
                await Clients.All.SendAsync("RemoveLike", postId, userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in RemoveLike: {ex.Message}");
                throw;
            }
        }
        public async Task UpdateNotification(int userId){
            try
            {
                await Clients.All.SendAsync("UpdateNotification",  userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddPost: {ex.Message}");
                throw;
            }
        }
    }
    
}