using API.Data.RepositoryContracts;
using API.Domain.Token;
using Dapper;
using System.Linq;

namespace API.Data.Repositories
{
    public class RefreshTokenRepository: IRefreshTokenRepository
    {
        private readonly DapperContext _dapperContext;
        public RefreshTokenRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        public async Task<RefreshToken> Create(RefreshToken refreshToken)
        {
            string sql = $@"INSERT INTO public.""refresh_tokens"" (user_id, token, expires, user_agent)
                            VALUES (@userId, @token, @expires, @userAgent)";

            var connection = _dapperContext.GetConnection();
            await connection.ExecuteAsync(sql, new 
            { 
                userId = refreshToken.UserId,
                token = refreshToken.Token,
                expires = refreshToken.Expires,
                userAgent = refreshToken.UserAgent,
            });

            return refreshToken;
        }

        public async Task<RefreshToken> Update(RefreshToken refreshToken)
        {
            string sql = $@"UPDATE public.""refresh_tokens""
                            SET token = @token, expires = @expires
                            WHERE id = @id;";

            var connection = _dapperContext.GetConnection();
            await connection.ExecuteAsync(sql, new
            {
                id = refreshToken.Id,
                token = refreshToken.Token,
                expires = refreshToken.Expires,
            });

            return refreshToken;
        }

        public async Task<bool> Delete(string refreshToken)
        {
            string sql = $@"DELETE FROM public.""refresh_tokens""
                            WHERE token = @refreshToken;";

            var connection = _dapperContext.GetConnection();
            var affectedRows = await connection.ExecuteAsync(sql, new
            {
                refreshToken
            });

            return Convert.ToBoolean(affectedRows);
        }

        public async Task<RefreshToken?> GetByUserId(int userId, string userAgent)
        {
            string sql = $@"SELECT rt.""id"" as Id,
                                   rt.""user_id"" as UserId,
                                   rt.""token"" as Token,
                                   rt.""expires"" as Expires,
                                   rt.""user_agent"" as UserAgent
                            FROM public.""refresh_tokens"" rt
                            WHERE user_id = @userId AND user_agent = @userAgent";

            var connection = _dapperContext.GetConnection();

            return await connection.QueryFirstOrDefaultAsync<RefreshToken>(sql, new { userId, userAgent });
        }

        public async Task<RefreshToken?> Find(string refreshToken)
        {
            string sql = $@"SELECT rt.""id"" as Id,
                                   rt.""user_id"" as UserId,
                                   rt.""token"" as Token,
                                   rt.""expires"" as Expires,
                                   rt.""user_agent"" as UserAgent
                            FROM public.""refresh_tokens"" rt
                            WHERE token = @refreshToken";

            var connection = _dapperContext.GetConnection();

            return await connection.QueryFirstOrDefaultAsync<RefreshToken>(sql, new { refreshToken });
        }
    }
}
