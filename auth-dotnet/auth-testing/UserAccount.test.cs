using auth_module.Controllers;
using auth_module.Data;
using auth_module.Data.DTOs;
using auth_module.Data.Models;
using auth_module.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace auth_testing;

public class UserAccountTest
{
    private readonly UserController _controller;
    private readonly UserAccountService _service;
    private readonly AuthContext _context;
    private readonly EnvironmentVariables _env;

    public UserAccountTest(MyFixture fixture)
    {
        _context = fixture.Context;
        _env = fixture.Env;
        _service = new UserAccountService(_context, _env);
        _controller = new UserController(_service);
    }

    [Fact]
    public void Works()
    {
        var result = _controller.Works();

        //The response should be 200 code status
        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task GetList()
    {
        var result = (OkObjectResult)await _controller.GetList();

        var accounts = Assert.IsType<List<UserAccount>>(result.Value);

        //Accounts should be more than 0
        Assert.True(accounts.Count > 0);
    }
}

public class MyFixture : IDisposable
{
    public AuthContext Context { get; private set; }
    public EnvironmentVariables Env { get; private set; }
    private readonly IConfiguration _configuration;

    public MyFixture()
    {
        _configuration = new ConfigurationBuilder()
            .Build();

        //Create the context and environment variables

        Context = new AuthContext();
        Env = new EnvironmentVariables(_configuration);
    }

    public void Dispose()
    {
    }
}

