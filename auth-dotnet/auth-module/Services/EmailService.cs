using System.Net.Mail.SmtpClient;

namespace auth_module.Services
{
  public class EmailService : IEmailService
  {

    private readonly AppEnvironments _appEnvironments;

    public EmailService(AppEnvironments appEnvironments)
    {
      _appEnvironments = appEnvironments;
    }

    public void SendEmail(string head, string sender, string body) { }

    public SmtpClient ConfigureStmClient()
    {
      string emailAccount = _appEnvironments.EMAIL_ACCOUNT;
      string emailPassword = _appEnvironments.EMAIL_PASSWORD;
      string smtp = _appEnvironments.EMAIL_SMTP;

      var smtpClient = new SmtpClient(smtp)
      {
        Port = 587,
        Credentials = new NetworkCredential(emailAccount, emailPassword),
        EnableSsl = true,
      };

      return smtpClient;
    }
  }
}