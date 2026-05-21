# MoreIT Backend

ASP.NET Core Web API — authentication with JWT and OTP verification.

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/download/win)

## Run with Docker

**1. Clone the repo**
```bash
git clone https://gitlab.com/dato.vatcharadze/moreit.git
cd moreit/backend/MoreIT.API
```

**2. Build and run**
```bash
docker build -t moreit-backend .
docker run -p 5000:5000 moreit-backend
```

**3. Test**

Open in browser: `http://localhost:5000/api/auth/register`

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/register` | Register new user, sends OTP to email |
| POST | `/api/auth/verify-otp` | Verify OTP code |
| POST | `/api/auth/login` | Login, returns JWT token |

## Environment

Edit `MoreIT.API/appsettings.json`:
```json
{
  "Email": {
    "From": "your@gmail.com",
    "Password": "your-gmail-app-password"
  }
}
```