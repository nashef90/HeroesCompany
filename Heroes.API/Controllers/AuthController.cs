using Heroes.API.Helpers;
using Heroes.API.Interfaces;
using Heroes.Contracts.Login;
using Heroes.Contracts.Register;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Heroes.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> logger;
        private readonly IAuthService accountService;

        public AuthController(ILogger<AuthController> logger, IAuthService accountService)
        {
            this.logger = logger;
            this.accountService = accountService;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<LoginResponseDTO>> Login(LoginRequestDTO request)
        {
            logger.LogDebug($"-> Login [request:'{JsonConvert.SerializeObject(request)}']");
            LoginResponseDTO response = await accountService.LoginAsync(request);
            logger.LogDebug($"Login:: response [request:'{JsonConvert.SerializeObject(request)}', response:'{JsonConvert.SerializeObject(response)}']");
            return response == null ? Unauthorized("Invalid credentials") : Ok(response);
        }

        [HttpPost("Register")]
        public async Task<ActionResult<RegisterResponseDTO>> Register(RegisterRequestDTO request)
        {
            logger.LogDebug($"-> Register [request:'{JsonConvert.SerializeObject(request)}']");

            // check username is exist
            if (await accountService.CheckUsernameIsExistAsync(request.UserName))
            {
                logger.LogDebug($"-> Register BadRequest[Username '{request.UserName}' is exist]");
                return BadRequest($"Username '{request.UserName}' is exist");
            }

            RegisterResponseDTO response = await accountService.RegisterAsync(request);
            logger.LogDebug($"Register:: CreatedTrainer [request:'{JsonConvert.SerializeObject(request)}', response:'{JsonConvert.SerializeObject(response)}']");

            return StatusCode(StatusCodes.Status201Created, response);
        }
    }
}
