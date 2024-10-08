using API.Domain.User;

namespace API.Data.RepositoryContracts
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User?> GetUserByEmail(string email);
        Task<User?> GetUserById(string id);
        //Task<int> UpdateUser(User user);
    }
}
