using Microsoft.AspNetCore.Mvc;
using auth_module.Data;
using auth_module.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace auth_module.Controllers;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{

  private readonly AuthContext _authContext;

  public UserController(AuthContext _authContext)
  {
    this._authContext = _authContext;
  }

  [HttpGet("list")]
  public async Task<IEnumerable<UserAccount>> GetList()
  {
    try
    {

      return await _authContext.UserAccounts.ToListAsync();
    }
    catch (Exception e)
    {
      Console.WriteLine("Error: " + e.Message);
      throw new InvalidOperationException("Could not do the operation");
    }
  }

  [HttpGet("byId/{id}")]
  public ActionResult<UserAccount> GetById(int id)
  {

    try
    {
      var result = _authContext.UserAccounts.Find(id);

      if (result is null)
      {
        return NotFound();
      }

      return Ok(result);
    }
    catch (Exception e)
    {
      Console.WriteLine("Error: " + e.Message);

      throw new InvalidOperationException("Could not do the operation");
    }
  }

  [HttpPost("create")]
  public ActionResult<UserAccount> CreateRegister(UserAccount ua)
  {
    try
    {
      _authContext.Add(ua);

      try
      {
        _authContext.SaveChanges();
      }
      catch (Exception e)
      {
        throw new InvalidOperationException("Could not do the operation: " + e.Message);
      }

      return CreatedAtAction(nameof(GetById), new { id = ua.Id }, ua);
    }
    catch (Exception e)
    {
      throw new InvalidOperationException("Could not do the operation: " + e.Message);
    }
  }

  [HttpPut("edit/{id}")]
  public ActionResult<UserAccount> Update(int id, UserAccount ua)
  {
    if (id != ua.Id)
    {
      return BadRequest();
    }

    var existingUser = _authContext.UserAccounts.Find(id);

    if (existingUser == null)
    {
      return NotFound();
    }

    existingUser.UserName = ua.UserName;
    existingUser.Email = ua.Email;
    existingUser.Password = ua.Password;

    try
    {
      _authContext.SaveChanges();

      return NoContent();
    }
    catch (Exception e)
    {
      throw new InvalidOperationException("Could not update user account: " + e.Message);
    }
  }
}