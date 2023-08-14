using System.Text.Json;
using auth_module.Data.DTOs;
using auth_module.Services;
using Microsoft.AspNetCore.Mvc;

namespace auth_module.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
  private readonly IEmailService _emailService;

  public EmailController(IEmailService emailService)
  {
    _emailService = emailService;
  }

  [HttpPost("bug")]
  public IActionResult SendEmailBug(EmailDTO emailDTO)
  {
    if (emailDTO == null)
    {
      return BadRequest(new { error = "Data cannot be null" });
    }

    try
    {
      var smtpClient = _emailService.GetStmClient();

      _emailService.SendEmail(emailDTO, smtpClient);

      return Ok(new { mensaje = "Email sended successfully" });
    }
    catch (Exception ex)
    {
      return StatusCode(500, new { error = $"Error sending bug report:  {ex.Message}" });
    }
  }

  [HttpPost("suggestions")]
  public IActionResult SendEmailSuggestion(EmailDTO emailDTO)
  {
    if (emailDTO == null)
    {
      return BadRequest(new { error = "Data cannot be null" });
    }

    try
    {
      var smtpClient = _emailService.GetStmClient();

      _emailService.SendEmail(emailDTO, smtpClient);

      return Ok(new { mensaje = "Email sended successfully" });
    }
    catch (Exception ex)
    {
      return StatusCode(500, new { error = $"Error sending suggestion:  {ex.Message}" });
    }
  }
}
