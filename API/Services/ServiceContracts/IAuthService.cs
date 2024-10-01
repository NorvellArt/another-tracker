using API.Domain.User;
using API.Dto.User;
using API.Models.Auth;

namespace API.Services.ServiceContracts
{
    public interface IAuthService
    {
        Task<User?> Register(UserCredentialsDto user);
        Task<TokensModel?> Login(UserCredentialsDto user, string userAgent);
        Task<TokensModel?> RefreshTokens(string token, string userAgent);
    }
}
