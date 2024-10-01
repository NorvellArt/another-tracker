using Npgsql;
using System.Data;

namespace API.Data
{
    public class DapperContext
    {
        private readonly string _connectionString = string.Empty;
        public DapperContext()
        {
            var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");
            if (connectionString is not null)
            {
                _connectionString = connectionString;
            }
        }

        public IDbConnection GetConnection()
        {
            return new NpgsqlConnection(_connectionString);
        }
    }
}
