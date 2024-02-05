namespace Api.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string comment { get; set; }
        public User user { get; set; }
        public int userId { get; set; }

        public Posts post { get; set; }
        public int postId { get; set; }
    }
}
