using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using auth_module.Data;
using auth_module.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace auth_module.Services;

public class UserAccountService
{
  private readonly AuthContext _context;

  public UserAccountService(AuthContext _context)
  {
    this._context = _context;
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
      throw new InvalidOperationException("Could not update user account: " + e.Message);
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

  public async Task<UserAccount> GetMatch(string user, string password)
  {
    decryptPassword(password);

    var userExisting = await _context.UserAccounts.FirstOrDefaultAsync(x => (x.UserName == user || x.Email == user) && x.Password == password);

    return userExisting;
  }

  public void encryptPassword(string password) { }

  public void decryptPassword(string password) { }

  public string GenerateJwtToken(string userId)
  {
    var secretKey = Environment.GetEnvironmentVariable("JWT_SECRET");
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.ASCII.GetBytes(secretKey);

    var tokenDescriptor = new SecurityTokenDescriptor
    {
      Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(ClaimTypes.Role, "composer")
        }),
      Expires = DateTime.UtcNow.AddDays(30),
      SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature)
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);

    return tokenHandler.WriteToken(token);
  }
}