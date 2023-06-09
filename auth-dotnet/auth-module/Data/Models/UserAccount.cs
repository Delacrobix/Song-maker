using System.ComponentModel.DataAnnotations;

namespace auth_module.Data.Models;

public partial class UserAccount
{
  public int Id { get; set; }

  [MaxLength(50, ErrorMessage = "UserName must be at least than 50 characters")]
  public string? UserName { get; set; }

  [MaxLength(75, ErrorMessage = "Email must be at least 75 characters")]
  [EmailAddress(ErrorMessage = "The email address must be a valid email address")]
  public string? Email { get; set; }

  [MaxLength(125, ErrorMessage = "Password must be at least 50 characters")]
  public string? Password { get; set; }

  public DateTime RegDate { get; set; }
}
