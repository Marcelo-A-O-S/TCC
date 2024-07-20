using Api.Models;

namespace Api.ViewModel
{
    public class PostViewModel
    {
        public int Id { get; set; }
        public string title { get; set; }
        public string guid { get; set; }
        public string description { get; set; }
        public List<LikeViewModel> likeViews { get; set; } = new List<LikeViewModel>();
        public List<ImageViewModel> imagesViews { get; set; } = new List<ImageViewModel>();
        public UserViewModel userview {get; set;} = new UserViewModel();
        public List<CommentViewModel> commentViews { get; set; } = new List<CommentViewModel>();
        public DateTime dateCreate {get; set;}
    }
}
