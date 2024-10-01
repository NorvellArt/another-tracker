using API.Data.RepositoryContracts;
using Dapper;
using API.Domain.User;
using API.Domain.Token;

namespace API.Data.RepositoryManager
{
    public class UserRepository : IUserRepository
    {
        private readonly DapperContext _dapperContext;

        public UserRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        public async Task<IEnumerable<User>> GetUsers() 
        {
            string sql = $@"SELECT *,
                                   u.""created_at"" as createdAt,
                                   u.""updated_at"" as updatedAt
                            FROM public.""users"" u";
            var connection = _dapperContext.GetConnection();

            return await connection.QueryAsync<User>(sql);
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            string sql = $@"SELECT u.""id"" as Id,
                                   u.""email"" as Email,
                                   u.""password_hash"" as PasswordHash,
                                   u.""password_salt"" as PasswordSalt
                            FROM public.""users"" u WHERE email=@_email";
            var connection = _dapperContext.GetConnection();
            return await connection.QueryFirstOrDefaultAsync<User>(sql, new { _email = email });
        }

        //public async Task<int> UpdateUser(User user)
        //{
        //    string sql = $@"UPDATE public.""users"" u
        //                    SET u.""updated_at"" = CURRENT_TIMESTAMP, 
        //                        u.""refresh_tokens"" = @refreshToken
        //                    WHERE u.""id"" = @id";
        //    var connection = _dapperContext.GetConnection();
        //    return await connection.ExecuteAsync(sql, new { id = user.id, refreshToken = user.refreshTokens });
        //}
    }
}
