namespace Api.ViewModel
{
    public class AnswerViewModel
    {
        public int Id { get; set; }
        public string answer { get; set; }
        public string guid {get; set;}
        public int userId { get; set; }
        public int postId {get; set;}
        public int commentId { get; set; }

        public DateTime dateCreate {get; set;}
    }
}
