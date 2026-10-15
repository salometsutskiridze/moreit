using SendGrid;
using SendGrid.Helpers.Mail;

namespace MoreIT.API.Services;

public class EmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config)
    {
        _config = config;
    }

    public string GenerateOtp()
    {
        return new Random().Next(100000, 999999).ToString();
    }

    public async Task SendOtpAsync(string toEmail, string otp)
    {
        var apiKey = _config["SendGrid:ApiKey"];
        var client = new SendGridClient(apiKey);
        var from = new EmailAddress("tsutskridzesalome39@gmail.com", "MoreIT");
        var to = new EmailAddress(toEmail);
        var msg = MailHelper.CreateSingleEmail(
            from, to,
            "MoreIT - Email Verification",
            $"შენი კოდია: {otp}. კოდი 10 წუთში იწურება.",
            $"<h2>MoreIT</h2><p>შენი კოდია: <strong>{otp}</strong></p><p>კოდი 10 წუთში იწურება.</p>"
        );
        await client.SendEmailAsync(msg);
    }
}