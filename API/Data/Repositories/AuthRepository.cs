using API.Data.RepositoryContracts;
using API.Domain.User;
using API.Dto.User;
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
        // TODO: Вынести в юзер репозитори, похоже надо UserCreate
        public async Task<User> Register(UserCredentialsDto userCredentials)
        {
            CreatePasswordHash(userCredentials.password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User();
            user.Email = userCredentials.email;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            string sql = $@"INSERT INTO users (email, password_hash, password_salt)
                            VALUES (@email, @passwordHash, @passwordSalt)";
            var connection = _dapperContext.GetConnection();
            await connection.ExecuteAsync(sql, user);

            return user;
        }

        // TODO: Вынести в сервис
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
