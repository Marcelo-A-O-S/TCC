namespace Api.Models
{
    public class Answer
    {
        public int Id { get; set; }
        public string answer { get; set; }
        public User user { get; set; }
        public int userId { get; set; }

        public Comment comment { get; set; }
        public int commentId { get; set; }
    }
}
