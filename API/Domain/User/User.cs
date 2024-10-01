using API.Domain.Token;
using System.Text.Json.Serialization;

namespace API.Domain.User
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public byte[] PasswordHash { get; set; }
        [JsonIgnore]
        public byte[] PasswordSalt { get; set; }
        [JsonIgnore]
        public DateTime? CreatedAt { get; set; }
        [JsonIgnore]
        public DateTime? UpdatedAt { get; set; }
        [JsonIgnore]
        public RefreshToken? RefreshToken { get; set; }
    }
}
