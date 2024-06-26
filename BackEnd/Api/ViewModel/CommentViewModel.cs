﻿namespace Api.ViewModel
{
    public class CommentViewModel
    {
        public int Id { get; set; }
        public string comment { get; set; }
        public string commentGuid { get; set; }
        public int userId { get; set; }
        public int postId { get; set; }
        public List<AnswerViewModel> answers { get; set; } = new List<AnswerViewModel>();
    }
}
