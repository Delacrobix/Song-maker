namespace auth_module.Services
{
  public interface IEmailService
  {
    public Task SendEmail(string head, string sender, string body);
  }
}