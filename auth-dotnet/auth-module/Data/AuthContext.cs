using Microsoft.EntityFrameworkCore;
using auth_module.Data.Models;

namespace auth_module.Data;

public partial class AuthContext : DbContext
{
  public AuthContext()
  {
  }

  public AuthContext(DbContextOptions<AuthContext> options)
      : base(options)
  {
  }

  public virtual DbSet<UserAccount> UserAccounts { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<UserAccount>(entity =>
    {
      entity.HasKey(e => e.Id).HasName("PK__UserAcco__3214EC279E7BC659");

      entity.ToTable("UserAccount");

      entity.Property(e => e.Id).HasColumnName("ID");
      entity.Property(e => e.Email)
              .HasMaxLength(75)
              .IsUnicode(false);
      entity.Property(e => e.Password)
              .HasMaxLength(50)
              .IsUnicode(false);
      entity.Property(e => e.RegDate).HasColumnType("datetime").HasDefaultValueSql("GETDATE()");
      entity.Property(e => e.UserName)
              .HasMaxLength(50)
              .IsUnicode(false);
    });

    OnModelCreatingPartial(modelBuilder);
  }

  partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
