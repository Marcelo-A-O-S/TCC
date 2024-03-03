namespace Api.ViewModel
{
    public class PostRequest
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public List<ImageViewModel> images { get; set; }
        public int userId { get; set; }
    }
}
