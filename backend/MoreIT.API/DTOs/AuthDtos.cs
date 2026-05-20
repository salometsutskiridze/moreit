namespace MoreIT.API.DTOs;

public record RegisterDto(string Name, string Email, string Password);
public record LoginDto(string Email, string Password);
public record VerifyOtpDto(string Email, string Otp);
public record AuthResponseDto(string Token, string Name);