using API.Data.RepositoryContracts;
using API.Domain.Token;
using API.Domain.User;
using API.Dto.User;
using API.Models.Auth;
using API.Services.ServiceContracts;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace API.Services
{
    public class AuthService: IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IUserRepository _userRepository;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public AuthService(IAuthRepository authRepository, IUserRepository userRepository, IRefreshTokenRepository refreshTokenRepository)
        {
            _authRepository = authRepository;
            _userRepository = userRepository;
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<User?> Register(UserCredentialsDto userCredentials)
        {
            CreatePasswordHash(userCredentials.password, out byte[] passwordHash, out byte[] passwordSalt);
            var user = new User();
            user.Email = userCredentials.email;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            
            return await _authRepository.Register(user);
        }

        public async Task<TokensModel?> Login(UserCredentialsDto userCredentials, string userAgent)
        {
            User? user = await _userRepository.GetUserByEmail(userCredentials.email);
            if (user == null) return null;
            if (!IsValidPasswordHash(userCredentials.password, user.PasswordHash, user.PasswordSalt)) return null;

            var jwtToken = generateJwtToken(user.Id);
            var refreshToken = await getRefreshToken(user.Id, userAgent);

            return new TokensModel(jwtToken, refreshToken);
        }

        public async Task<TokensModel?> RefreshTokens(string refreshToken, string userAgent)
        {
            var token = await _refreshTokenRepository.Find(refreshToken);
            if (token is null) return null;

            await _refreshTokenRepository.Delete(refreshToken);

            if (token.Expires < DateTime.Now) return null;

            var newJwtToken = generateJwtToken(token.UserId);
            var newRefreshToken = await getRefreshToken(token.UserId, userAgent);

            return new TokensModel(newJwtToken, newRefreshToken);
        }

        private static bool IsValidPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != passwordHash[i])
                {
                    return false;
                }
            }

            return true;
        }

        private string generateJwtToken(int userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var envToken = Environment.GetEnvironmentVariable("TOKEN");
            var key = Encoding.UTF8.GetBytes(envToken);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private async Task<RefreshToken> getRefreshToken(int userId, string userAgent)
        {
            var token = await _refreshTokenRepository.GetByUserId(userId, userAgent);

            using var rng = RandomNumberGenerator.Create();
            var randomBytes = new byte[64];
            rng.GetBytes(randomBytes);

            if (token == null)
            {
                var newToken = new RefreshToken
                {
                    Token = Convert.ToBase64String(randomBytes),
                    Expires = DateTime.UtcNow.AddDays(7),
                    UserId = userId,
                    UserAgent = userAgent,
                };

                return await _refreshTokenRepository.Create(newToken);
            }

            token.Token = Convert.ToBase64String(randomBytes);
            token.Expires = DateTime.UtcNow.AddDays(7);

            return await _refreshTokenRepository.Update(token);
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }
}
