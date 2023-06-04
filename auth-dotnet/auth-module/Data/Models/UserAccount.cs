using System;
using System.Collections.Generic;

namespace auth_module.Data.Models;

public partial class UserAccount
{
    public int Id { get; set; }

    public string? UserName { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public DateTime RegDate { get; set; }
}
