﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class Posts
    {
        [Key]
        public int Id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public List<Image> images { get; set; }

        public User user { get; set; }
        [ForeignKey("User")]
        public int userId { get; set; }

        public List<Comment> comments { get; set; }
    }
}
