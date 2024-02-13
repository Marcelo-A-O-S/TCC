namespace Api.ViewModel
{
    public class PostRequest
    {
        public int Id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public List<ImageViewModel> imagesViews { get; set; }
        public int userId { get; set; }
    }
}
