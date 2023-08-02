using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using auth_module.Data;
using auth_module.Data.DTOs;
using auth_module.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

namespace auth_module.Services;

public class UserAccountService
{
  private readonly AuthContext _context;
  private readonly EnvironmentVariables _env;

  public UserAccountService(AuthContext _context, EnvironmentVariables _env)
  {
    this._context = _context;
    this._env = _env;
  }

  public async Task<IEnumerable<UserAccount>> GetList()
  {
    try
    {
      return await _context.UserAccounts.ToListAsync();
    }
    catch (Exception e)
    {
      throw new InvalidOperationException("Could not get the list: " + e.Message);
    }
  }

  public async Task<UserAccount> GetById(int id)
  {
    try
    {
      var result = await _context.UserAccounts.FindAsync(id);

      return result;
    }
    catch (Exception e)
    {
      throw new InvalidOperationException("Could not find user: " + e.Message);
    }
  }

  public async Task<UserAccount> CreateRegister(UserAccount ua)
  {
    try
    {
      await _context.AddAsync(ua);

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (Exception e)
      {
        throw new InvalidOperationException("Could not save changes: " + e.Message);
      }

      return ua;
    }
    catch (Exception e)
    {
      throw new InvalidOperationException("Could not do the operation: " + e.Message);
    }
  }

  public async Task Update(int id, UserAccount ua)
  {
    var existingUser = await GetById(id);

    existingUser.UserName = ua.UserName;
    existingUser.Email = ua.Email;
    existingUser.Password = ua.Password;

    try
    {
      await _context.SaveChangesAsync();
    }
    catch (Exception e)
    {
      throw new InvalidOperationException("Cannot update user account: " + e.Message);
    }
  }

  public async Task Delete(int id)
  {
    var userExisting = await GetById(id);

    try
    {
      _context.UserAccounts.Remove(userExisting);

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (Exception e)
      {
        throw new InvalidOperationException("Could not save changes: " + e.Message);
      }
    }
    catch (Exception e)
    {
      throw new InvalidOperationException("Could not delete user: " + e.Message);
    }
  }

  public async Task<UserAccount> GetByUserNameOrEmail(string userNameOrEmail)
  {
    var user = await _context.UserAccounts.FirstOrDefaultAsync(x => x.Email == userNameOrEmail || x.UserName == userNameOrEmail);

    return user;
  }

  public string encryptPassword(string password)
  {
    using (SHA256 sha256 = SHA256.Create())
    {
      byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
      byte[] hashBytes = sha256.ComputeHash(passwordBytes);
      string hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

      return hashString;
    }
  }

  public bool VerifyPassword(string password, string hashedPassword)
  {
    using (SHA256 sha256 = SHA256.Create())
    {
      byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
      byte[] hashBytes = sha256.ComputeHash(passwordBytes);

      string hashedInput = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

      return hashedInput.Equals(hashedPassword);
    }
  }

  public string GenerateJwtToken(string jsonKey)
  {
    string secretKey = _env.JWT_SECRET();

    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.UTF8.GetBytes(secretKey);

    var tokenDescriptor = new SecurityTokenDescriptor
    {
      Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.NameIdentifier, jsonKey),
            new Claim(ClaimTypes.Role, "composer")
        }),
      Expires = DateTime.UtcNow.AddDays(15),
      SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature)
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);

    return tokenHandler.WriteToken(token);
  }
}