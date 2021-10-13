using System.ComponentModel.DataAnnotations;

namespace Heroes.Contracts.Register
{
    public class RegisterRequestDTO
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string FName { get; set; }

        [Required]
        public string LName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [RegularExpression(@"^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[!*@#$%^&+=]).*$",
            ErrorMessage = "Password must be at least 8 characters, and also must include at least one upper case letter, one symbol, and one numeric digit.")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "The passwords do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
