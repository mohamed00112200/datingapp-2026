using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration configuration) : ITokenService
{
    public string CreateToken(AppUser User)
    {
        var TokenKey = configuration["TokenKey"] ?? throw new Exception("Connot get token key");
        if (TokenKey.Length < 64) throw new Exception("Your token key needs to be >= 64 charcters");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenKey));

        var claims = new List<Claim>
        {
            new(ClaimTypes.Email,User.Email),
            new (ClaimTypes.NameIdentifier,User.Id)
        };
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var TokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(TokenDescriptor);
        return tokenHandler.WriteToken(token) ;   
    }

}
