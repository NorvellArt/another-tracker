using API.Domain.User;

namespace API.Data.RepositoryContracts
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User?> GetUserByEmail(string email);
        //Task<int> UpdateUser(User user);
    }
}
