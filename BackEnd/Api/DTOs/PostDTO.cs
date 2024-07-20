using Api.DTOs;

namespace Api.ViewModel
{
    public class PostDTO
    {
        public int id { get; set; }
        public string guid {get; set;}
        public string title { get; set; }
        public string description { get; set; }
        public List<ImageDTO> images { get; set; }
        public int userId { get; set; }
    }
}
