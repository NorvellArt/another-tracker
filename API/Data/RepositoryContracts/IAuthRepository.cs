using API.Domain.User;

namespace API.Data.RepositoryContracts
{
    public interface IAuthRepository
    {
        Task<User> Register(User newUser);
    }
}
