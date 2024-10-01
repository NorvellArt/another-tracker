using System.ComponentModel.DataAnnotations;

namespace API.Dto.User
{
    public class UserCredentialsDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        [StringLength(24, MinimumLength = 6, ErrorMessage = "Password should be between 6 and 24 characters")]
        public string password { get; set; }
    }
}
