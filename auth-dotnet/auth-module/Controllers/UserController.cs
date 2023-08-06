using Microsoft.AspNetCore.Mvc;
using auth_module.Services;
using auth_module.Data.Models;
using auth_module.Data.DTOs;
using System.Text.Json;

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

  [HttpGet("works")]
  public ActionResult Works()
  {
    return Ok("Works");
  }

  [HttpPost("validate")]
  public async Task<ActionResult> ValidateUser([FromBody] UserCredentials credentials)
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
        var objectKey = new
        {
          id = existingUser.Id,
          userName = credentials.UserName,
          email = existingUser.Email
        };

        string jsonKey = JsonSerializer.Serialize(objectKey);
        var token = _service.GenerateJwtToken(jsonKey);

        var response = new
        {
          token
        };

        return Ok(response);
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
      return NotFound(new { message = $"The client with ID {id} does not exist" });
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

    if (string.IsNullOrEmpty(ua.UserName))
    {
      return BadRequest(new { Message = "User name cannot be empty." });
    }
    else if (string.IsNullOrEmpty(ua.Email))
    {
      return BadRequest(new { Message = "Email cannot be empty." });
    }
    else if (string.IsNullOrEmpty(ua.Password))
    {
      return BadRequest(new { Message = "Password cannot be empty." });
    }

    if (!(_service.IsEmailValid(ua.Email)))
    {
      return BadRequest(new { Message = "Email is not valid." });
    }

    var userExisting = await _service.GetByUserNameOrEmail(ua.UserName);
    var emailExisting = await _service.GetByUserNameOrEmail(ua.Email);

    if (userExisting is not null)
    {
      return BadRequest(new { Message = "User already exist." });
    }
    else if (emailExisting is not null)
    {
      return BadRequest(new { Message = "Email already exist." });
    }
    else
    {
      ua.Password = _service.encryptPassword(ua.Password);
      var newRegister = await _service.CreateRegister(ua);


      //Creating JWT
      var objectKey = new
      {
        id = ua.Id,
        userName = ua.UserName,
        email = ua.Email
      };

      string jsonKey = JsonSerializer.Serialize(objectKey);
      var token = _service.GenerateJwtToken(jsonKey);

      return Created(nameof(GetById), new { token });
    }
  }

  [HttpPut("edit/email/{id}/{email}")]
  public async Task<ActionResult> UpdateEmail(int id, string email)
  {
    if (string.IsNullOrEmpty(email))
    {
      return BadRequest(new { Message = "Parameters cannot be empty." });
    }

    if (!(_service.IsEmailValid(email)))
    {
      return BadRequest(new { Message = "Email is not valid." });
    }

    var userFromDatabase = await _service.GetByUserNameOrEmail(email);

    if (userFromDatabase is not null)
    {
      return BadRequest(new { message = $"The email already exist." });
    }

    var existingUser = await _service.GetById(id);

    if (existingUser is not null)
    {
      existingUser.Email = email;

      var objectKey = new
      {
        id = existingUser.Id,
        userName = existingUser.UserName,
        email = existingUser.Email
      };

      string jsonKey = JsonSerializer.Serialize(objectKey);
      var token = _service.GenerateJwtToken(jsonKey);

      var response = new
      {
        token
      };

      await _service.Update(id, existingUser);

      return Ok(response);
    }
    else
    {
      return NotFound(new { message = $"The client with ID does not exist" });
    }
  }

  [HttpPut("edit/password/{id}/{pass}/{dupPass}")]
  public async Task<ActionResult> UpdateEmail(int id, string pass, string dupPass)
  {
    if (string.IsNullOrEmpty(pass) || string.IsNullOrEmpty(dupPass))
    {
      return BadRequest(new { Message = "Fields fields cannot be empty." });
    }

    if (pass != dupPass)
    {
      return BadRequest(new { message = $"The passwords does not match." });
    }

    var existingUser = await _service.GetById(id);

    if (existingUser is not null)
    {

      if (_service.VerifyPassword(pass, existingUser.Password))
      {
        return BadRequest(new { message = $"The password, is your current password." });
      }

      existingUser.Password = _service.encryptPassword(pass);

      await _service.Update(id, existingUser);
      return NoContent();
    }
    else
    {
      return NotFound(new { message = $"The client with ID does not exist." });
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
      return NotFound(new { message = $"The client with ID does not exist." });
    }
  }
}