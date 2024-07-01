namespace Api.DTOs
{
    public class AnswerDTO
    {
        public int Id { get; set; }
        public string answer { get; set; }
        public int userId { get; set; }
        public int commentId { get; set; }
    }
}
