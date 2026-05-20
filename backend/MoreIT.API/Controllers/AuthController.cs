using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MoreIT.API.Data;
using MoreIT.API.DTOs;
using MoreIT.API.Models;
using MoreIT.API.Services;

namespace MoreIT.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;
    private readonly EmailService _email;

    public AuthController(AppDbContext db, IConfiguration config, EmailService email)
    {
        _db = db;
        _config = config;
        _email = email;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest(new { error = "Email already exists" });

        var otp = _email.GenerateOtp();
        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            OtpCode = otp,
            IsVerified = false
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        await _email.SendOtpAsync(dto.Email, otp);

        return Ok(new { message = "OTP sent to email" });
    }

    [HttpPost("verify-otp")]
    public async Task<IActionResult> VerifyOtp(VerifyOtpDto dto)
    {
        var user = await _db.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null)
            return NotFound(new { error = "User not found" });

        if (user.OtpCode != dto.Otp)
            return BadRequest(new { error = "Wrong OTP" });

        user.IsVerified = true;
        user.OtpCode = null;
        await _db.SaveChangesAsync();

        var token = GenerateJwt(user);
        return Ok(new AuthResponseDto(token, user.Name));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _db.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null)
            return NotFound(new { error = "User not found" });

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized(new { error = "Wrong password" });

        if (!user.IsVerified)
            return StatusCode(403, new { error = "Please verify your email first" });

        var token = GenerateJwt(user);
        return Ok(new AuthResponseDto(token, user.Name));
    }

    private string GenerateJwt(User user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: new[] { new Claim("id", user.Id.ToString()) },
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}