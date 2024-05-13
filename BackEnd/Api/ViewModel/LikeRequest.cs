namespace Api.ViewModel
{
    public class LikeRequest
    {
        public string Guid { get; set; }
        public int userId { get; set; }
        public int postId { get; set;}
    }
}