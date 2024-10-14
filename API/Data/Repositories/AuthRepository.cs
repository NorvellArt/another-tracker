using API.Data.RepositoryContracts;
using API.Domain.User;
using Dapper;

namespace API.Data.Repositories
{
    public class AuthRepository: IAuthRepository
    {
        private readonly DapperContext _dapperContext;

        public AuthRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        public async Task<User> Register(User newUser)
        {
            string sql = $@"INSERT INTO users (email, password_hash, password_salt)
                            VALUES (@email, @passwordHash, @passwordSalt)";
            var connection = _dapperContext.GetConnection();
            await connection.ExecuteAsync(sql, newUser);

            return newUser;
        }
    }
}
