using System.ComponentModel.DataAnnotations;

namespace Api.ViewModel
{
    public class LoginViewModel
    {
        [EmailAddress]
        public string email { get; set; }
        public string password { get; set; }
    }
}
