using API.Data.RepositoryContracts;
using API.Domain.Token;
using API.Domain.User;
using API.Dto.User;
using API.Services.ServiceContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserRepository _userRepository;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        public AuthController
        (
            IAuthService authService,
            IUserRepository userRepository,
            IRefreshTokenRepository refreshTokenRepository
        )
        {
            _authService = authService;
            _userRepository = userRepository;
            _refreshTokenRepository = refreshTokenRepository;
        }

        [Authorize]
        [HttpGet("protected")]
        public IActionResult ProtectedPath()
        {
            return Ok("SUCCESS!! \n-You may view this only with a valid bearer access token header");
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserCredentialsDto newUserCredentials)
        {
            var user = await _userRepository.GetUserByEmail(newUserCredentials.email);
            if (user != null) return BadRequest(new { message = "Email is already taken" });

            var newUser = await _authService.Register(newUserCredentials);

            return Ok(newUser);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserCredentialsDto user)
        {
            var result = await _authService.Login(user, GetUserAgent());
            if (result is null)
                return BadRequest(new { message = "Username or password is incorrect" });

            SetTokenCookie(result.RefreshToken);

            return Ok(result);
        }

        [Authorize]
        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshtoken"];
            if (refreshToken is null) return Ok();

            await _refreshTokenRepository.Delete(refreshToken);
            DeleteTokenCookie();

            return Ok(true);
        }

        [AllowAnonymous]
        [HttpGet("refresh-tokens")]
        public async Task<IActionResult> RefreshTokens()
        {
            var refreshToken = Request.Cookies["refreshtoken"];
            if (refreshToken is null) return StatusCode(401, "Referesh token is empty");

            var userAgent = GetUserAgent();

            var tokens = await _authService.RefreshTokens(refreshToken, userAgent);
            if (tokens is null) return StatusCode(401, "Unauthorized");

            SetTokenCookie(tokens.RefreshToken);

            return Ok(tokens);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<IActionResult> CurrentUser()
        {
            var userId = User.Claims.Where(x => x.Type == ClaimTypes.NameIdentifier).FirstOrDefault()?.Value;
            var user = await _userRepository.GetUserById(userId);
            return Ok(user);
        }

        private string GetUserAgent()
        {
            var userAgent = Request.Headers.UserAgent.ToString();
            if (userAgent is null) return "Undefined user agent";

            return userAgent;
        }

        private void SetTokenCookie(RefreshToken token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = token.Expires,
            };
            Response.Cookies.Append("refreshtoken", token.Token, cookieOptions);
        }

        private void DeleteTokenCookie()
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                Expires = DateTime.Now,
            };
            Response.Cookies.Append("refreshtoken", "", cookieOptions);
        }
    }
}
