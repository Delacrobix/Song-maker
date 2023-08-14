using System.Net;
using System.Net.Mail;
using System.Text.Json;
using auth_module.Data.DTOs;
using auth_module.Data.Models;

namespace auth_module.Services;

public class EmailService : IEmailService
{

  private readonly IConfiguration _configuration;

  public EmailService(IConfiguration configuration)
  {
    _configuration = configuration;
  }

  public async void SendEmail(EmailDTO emailDTO, SmtpClient smtpClient)
  {
    string emailAccount = _configuration["AppEnvironments:EMAIL_ACCOUNT"];
    var emailData = JsonSerializer.Deserialize<EmailData>(emailDTO.JsonEmailData);

    var mailMessage = new MailMessage
    {
      From = new MailAddress(emailAccount),
      Subject = emailData.Subject,
      Body = emailData.Body,
      IsBodyHtml = true,
    };
    mailMessage.To.Add(emailAccount);

    await smtpClient.SendMailAsync(mailMessage);
  }

  public SmtpClient GetStmClient()
  {
    string emailAccount = _configuration["AppEnvironments:EMAIL_ACCOUNT"];
    string emailPassword = _configuration["AppEnvironments:EMAIL_PASSWORD"];
    string smtp = _configuration["AppEnvironments:EMAIL_SMTP"];

    var smtpClient = new SmtpClient(smtp)
    {
      Port = 587,
      Credentials = new NetworkCredential(emailAccount, emailPassword),
      EnableSsl = true,
    };

    return smtpClient;
  }
}
