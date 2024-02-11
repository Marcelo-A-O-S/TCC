namespace Api.ViewModel
{
    public class CommentRequest
    {
        public int Id { get; set; }
        public string comment { get; set; }
        public int userId { get; set; }
        public int postId { get; set; }
    }
}
