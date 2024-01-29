using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public User()
        {

        }
        public User(int id, string username, string email, string password)
        {
            Id = id;
            this.username = username;
            this.email = email;
            this.password = password;
        }
    }
}
