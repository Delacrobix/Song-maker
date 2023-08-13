using Microsoft.AspNetCore.Mvc;

namespace auth_module.Controllers
{

  [Route("[controller]/email")]
  [ApiController]
  public class EmailController : ControllerBase
  {
    [HttpPost("/bug")]
    public async Task<IActionResult> SendEmailBig()
    {
      try
      {
        // Enviar el correo
        var smtpClient = new SmtpClient("smtp.gmail.com")
        {
          Port = 587,
          Credentials = new NetworkCredential("tu_correo@gmail.com", "tu_contraseña"),
          EnableSsl = true,
        };

        var mailMessage = new MailMessage
        {
          From = new MailAddress("tu_correo@gmail.com"),
          Subject = "Nuevo mensaje desde el formulario",
          Body = $"Nombre: {formData.Nombre}\nEmail: {formData.Email}\nMensaje: {formData.Mensaje}",
        };
        mailMessage.To.Add("tu_correo@gmail.com");

        await smtpClient.SendMailAsync(mailMessage);

        return Ok(new { mensaje = "Correo enviado con éxito" });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { error = "Error al enviar el correo" });
      }
    }

    [HttpPost("/suggestion")]
    public async Task<IActionResult> SendEmailSuggestion()
    {
    }
  }
}