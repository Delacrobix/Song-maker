using System.Net.Mail;
using auth_module.Data.DTOs;

namespace auth_module.Services;

public interface IEmailService
{
  public void SendEmail(EmailDTO emailDTO, SmtpClient smtpClient);

  public SmtpClient GetStmClient();
}
