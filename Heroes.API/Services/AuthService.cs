using Heroes.API.Configuration;
using Heroes.API.DAL;
using Heroes.API.DAL.Entities;
using Heroes.API.Helpers;
using Heroes.API.Interfaces;
using Heroes.Contracts.Login;
using Heroes.Contracts.Register;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Heroes.API.Services
{
    internal class AuthService : IAuthService
    {
        private readonly ILogger<AuthService> logger;
        private readonly HeroesContext context;
        private readonly IOptions<AppConfig> config;

        public AuthService(HeroesContext context, IOptions<AppConfig> config, ILogger<AuthService> logger)
        {
            this.context = context;
            this.config = config;
            this.logger = logger;
        }

        public async Task<LoginResponseDTO> LoginAsync(LoginRequestDTO request)
        {
            logger.LogDebug($"-> LoginAsync [request = '{JsonConvert.SerializeObject(request)}']");
            if (request == null || string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.Password))
                return null;

            //calculating password hash
            string hashPass = CryptoHelper.Hash(request.Password, config?.Value?.HashSalt);

            request.UserName = request.UserName.ToLower();
            Trainer trainer = await context.Trainers.FirstOrDefaultAsync(t =>
                t.UserName.Equals(request.UserName) &&
                t.Password.Equals(hashPass)
                );

            if (trainer == null)
                return null;

            return new LoginResponseDTO()
            {
                Id = trainer.Id,
                FullName = $"{trainer.FName} {trainer.LName}",
                UserName = trainer.UserName,
                Token = CretaeToken(trainer)
            };
        }

        public async Task<RegisterResponseDTO> RegisterAsync(RegisterRequestDTO request)
        {
            logger.LogDebug($"-> RegisterAsync [request = '{JsonConvert.SerializeObject(request)}']");
            Trainer trainer = new Trainer()
            {
                UserName = request.UserName.ToLower(),
                Password = CryptoHelper.Hash(request.Password, config?.Value?.HashSalt),
                FName = request.FName,
                LName = request.LName,
                IsDeleted = false,
            };
            await context.Trainers.AddAsync(trainer);
            context.SaveChanges();

            return new RegisterResponseDTO()
            {
                Id = trainer.Id,
                FullName = $"{trainer.FName} {trainer.LName}",
                UserName = trainer.UserName,
                Token = CretaeToken(trainer),
            };
        }

        public async Task<bool> CheckUsernameIsExistAsync(string username)
        {
            username = username.ToLower();
            return await context.Trainers.AnyAsync(t =>
                t.UserName.Equals(username));
        }

        private string CretaeToken(Trainer trainer)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.Value.TokenKey));
            var claims = new List<Claim>
            {
                new Claim("Id", trainer.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.NameId, trainer.UserName),
                new Claim(JwtRegisteredClaimNames.GivenName, trainer.FName),
                new Claim(JwtRegisteredClaimNames.FamilyName, trainer.LName)
            };
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
