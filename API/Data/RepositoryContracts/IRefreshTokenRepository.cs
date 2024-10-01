using API.Domain.Token;

namespace API.Data.RepositoryContracts
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken> Create(RefreshToken refreshToken);
        Task<RefreshToken> Update(RefreshToken refreshToken);
        Task<bool> Delete(string refreshToken);
        Task<RefreshToken?> GetByUserId(int userId, string userAgent);
        Task<RefreshToken?> Find(string refreshToken);

    }
}
