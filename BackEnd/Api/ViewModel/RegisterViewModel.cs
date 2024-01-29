using System.ComponentModel.DataAnnotations;

namespace Api.ViewModel
{
    public class RegisterViewModel
    {
        public string username { get; set; }
        public string password { get; set; }
        [Compare("password", ErrorMessage = "Senha não confere!")]
        public string passwordConfirm { get; set; }
        [EmailAddress]
        public string email { get; set; }
    }
}
