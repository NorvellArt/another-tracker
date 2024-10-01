using API.Domain.User;
using API.Dto.User;

namespace API.Data.RepositoryContracts
{
    public interface IAuthRepository
    {
        Task<User> Register(UserCredentialsDto userCredentials);
    }
}
