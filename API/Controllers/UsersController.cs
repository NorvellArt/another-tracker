using Microsoft.AspNetCore.Mvc;
using API.Data.RepositoryContracts;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController: ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var data = await _userRepository.GetUsers();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return Ok(ex.ToString());
            }
        }
    }
}
