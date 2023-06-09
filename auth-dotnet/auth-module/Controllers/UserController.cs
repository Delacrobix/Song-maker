using Microsoft.AspNetCore.Mvc;
using auth_module.Services;
using auth_module.Data.Models;
using auth_module.Data.DTOs;

namespace auth_module.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
  private readonly UserAccountService _service;

  public UserController(UserAccountService _service)
  {
    this._service = _service;
  }

  [HttpPost("validate")]
  public async Task<ActionResult<string>> ValidateUser([FromBody] UserCredentials credentials)
  {
    if (String.IsNullOrEmpty(credentials.UserName))
    {
      return BadRequest(new { message = "The user or email must be specified" });
    }
    else if (String.IsNullOrEmpty(credentials.Password))
    {
      return BadRequest(new { message = "The password must be specified" });
    }

    var existingUser = await _service.GetByUserNameOrEmail(credentials.UserName);

    if (existingUser is not null)
    {
      if (_service.VerifyPassword(credentials.Password, existingUser.Password))
      {
        var token = _service.GenerateJwtToken(existingUser.Id.ToString());
        return token;
      }
      else
      {
        return NotFound(new { message = "Incorrect password." });
      }
    }
    else
    {
      return NotFound(new { message = "User or email doesn't exist." });
    }
  }

  [HttpGet("list")]
  public async Task<IEnumerable<UserAccount>> GetList()
  {
    return await _service.GetList();
  }

  [HttpGet("byId/{id}")]
  public async Task<ActionResult<UserAccount>> GetById(int id)
  {
    var result = await _service.GetById(id);

    if (result is null)
    {
      return ClientNotFound(id);
    }

    return Ok(result);
  }

  [HttpPost("create")]
  public async Task<ActionResult<UserAccount>> CreateRegister(UserAccount ua)
  {
    if (ua == null)
    {
      return BadRequest(new { Message = "Parameters cannot be null." });
    }

    var userExisting = await _service.GetByUserNameOrEmail(ua.UserName);
    if (userExisting is not null)
    {
      return BadRequest(new { Message = "User or email already exist." });
    }
    else
    {
      ua.Password = _service.encryptPassword(ua.Password);
      var newRegister = await _service.CreateRegister(ua);

      return CreatedAtAction(nameof(GetById), new { id = newRegister.Id }, newRegister);
    }
  }

  [HttpPut("edit/{id}")]
  public async Task<ActionResult<UserAccount>> Update(int id, UserAccount ua)
  {
    if (id != ua.Id)
    {
      return BadRequest(new { message = $"The URL ID {id} does not match with the body request ID {ua.Id}." });
    }

    var existingUser = await _service.GetById(id);

    if (existingUser is not null)
    {
      await _service.Update(id, ua);
      return NoContent();
    }
    else
    {
      return ClientNotFound(id);
    }
  }

  [HttpDelete("delete/{id}")]
  public async Task<ActionResult<UserAccount>> Delete(int id)
  {
    var userExisting = await _service.GetById(id);

    if (userExisting is not null)
    {
      await _service.Delete(id);
      return Ok();
    }
    else
    {
      return ClientNotFound(id);
    }
  }

  public NotFoundObjectResult ClientNotFound(int id)
  {
    return NotFound(new { message = $"The client with ID {id} does not exist" });
  }
}