using Api.Models;
using Api.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api.Services
{
    public class JwtBearerServices : IJwtBearerServices
    {
        private readonly IConfiguration config;

        public JwtBearerServices(IConfiguration config)
        {
            this.config = config;
        }
        public async Task<string> GenerateJwtToken(User user)
        {
            
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim("Email", user.email));
            claims.Add(new Claim("Username", user.username));
            var sercurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config.GetSection("JwtKey:Key").Value));
            var credentials = new SigningCredentials(sercurityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                claims: claims,
                signingCredentials: credentials,
                expires: DateTime.Now.AddHours(8)
                );
            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            return jwtToken;
        }
    }
}
