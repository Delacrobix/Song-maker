namespace auth_module.Data.DTOs;

using Microsoft.Extensions.Configuration;

public class EnvironmentVariables
{
    private readonly IConfiguration _configuration;

    public EnvironmentVariables(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string JWT_SECRET()
    {
        string jwtSecret = _configuration["AppEnvironments:JWT_SECRET"];

        return jwtSecret;
    }
}
