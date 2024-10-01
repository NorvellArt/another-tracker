using API.Domain.Token;
using API.Domain.User;
using System.Text.Json.Serialization;

namespace API.Models.Auth
{
    public class TokensModel
    {
        [JsonPropertyName("token")]
        public string JwtToken { get; set; }
        [JsonIgnore]
        public RefreshToken RefreshToken { get; set; }

        public TokensModel(string jwtToken, RefreshToken refreshToken)
        {
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }
    }
}
