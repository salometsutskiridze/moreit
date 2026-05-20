using MailKit.Net.Smtp;
using MimeKit;

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
        var message = new MimeMessage();
        message.From.Add(MailboxAddress.Parse(_config["Email:From"]));
        message.To.Add(MailboxAddress.Parse(toEmail));
        message.Subject = "MoreIT - Email Verification";
        message.Body = new TextPart("plain")
        {
            Text = $"MoreIT - შენი კოდია: {otp}\n\nკოდი 10 წუთში იწურება."
        };

        using var client = new SmtpClient();
        await client.ConnectAsync("smtp.gmail.com", 587, false);
        await client.AuthenticateAsync(
            _config["Email:From"],
            _config["Email:Password"]
        );
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}