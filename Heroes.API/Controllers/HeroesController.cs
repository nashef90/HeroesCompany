using Heroes.API.Configuration;
using Heroes.API.Extentions;
using Heroes.API.Interfaces;
using Heroes.Contracts.Models.Hero;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Heroes.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HeroesController : ControllerBase
    {
        private readonly ILogger<HeroesController> logger;
        private readonly IHeroesService heroesService;
        private readonly IOptions<AppConfig> config;

        public HeroesController(ILogger<HeroesController> logger, IHeroesService heroesService, IOptions<AppConfig> config)
        {
            this.logger = logger;
            this.heroesService = heroesService;
            this.config = config;
        }

        [HttpGet]
        public async Task<ActionResult<List<HeroDTO>>> Get()
        {
            logger.LogDebug($"-> Get");
            Guid trainerId = HttpContext.GetTrainerId();
            List<HeroDTO> result = await heroesService.Get(trainerId);
            logger.LogDebug($"Get:: response [result:'{JsonConvert.SerializeObject(result)}']");
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HeroDTO>> Get(Guid id)
        {
            logger.LogDebug($"-> Get [id = '{id}']");
            Guid trainerId = HttpContext.GetTrainerId();
            HeroDTO result = await heroesService.Get(id, trainerId);
            logger.LogDebug($"Get:: response [result:'{JsonConvert.SerializeObject(result)}']");
            return result == null ? NotFound($"Hero id '{id}' not found") : Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<HeroDTO>> Post([FromBody] AddHeroRequestDTO item)
        {
            logger.LogDebug($"-> Post [item = '{JsonConvert.SerializeObject(item)}']");
            Guid trainerId = HttpContext.GetTrainerId();
            HeroDTO heroAdded = await heroesService.Add(item, trainerId);
            logger.LogDebug($"Post:: response [result:'{JsonConvert.SerializeObject(heroAdded)}']");
            return StatusCode(StatusCodes.Status201Created, heroAdded);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<HeroDTO>> Put(Guid id, [FromBody] UpdateHeroRequestDTO item)
        {
            logger.LogDebug($"-> Put [item = '{JsonConvert.SerializeObject(item)}']");
            Guid trainerId = HttpContext.GetTrainerId();
            item.Id = id;
            HeroDTO heroUpdated = await heroesService.Update(item, trainerId);
            logger.LogDebug($"Put:: response [result:'{JsonConvert.SerializeObject(heroUpdated)}']");
            return heroUpdated == null ? NotFound($"Hero id '{id}' not found") : Ok(heroUpdated);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            logger.LogDebug($"-> Delete [id = '{id}']");
            Guid trainerId = HttpContext.GetTrainerId();
            bool itemIsExist = await heroesService.Delete(id, trainerId);
            return itemIsExist ? NoContent() : NotFound($"Hero id '{id}' not found");
        }

        [HttpPost("StartTraining/{heroId}")]
        public async Task<ActionResult<HeroDTO>> StartTraining(Guid heroId)
        {
            logger.LogDebug($"-> StartTraining [heroId = '{heroId}']");
            Guid trainerId = HttpContext.GetTrainerId();

            bool isTheHeroAllowedToTrainingToday = await heroesService.IsTheHeroAllowedToTrainingToday(heroId, trainerId);
            if (!isTheHeroAllowedToTrainingToday)
                return BadRequest($"It is not possible to training more than {config?.Value?.MaxQuantityOfTrainingPerHeroOnDay} times a day");

            HeroDTO heroItem = await heroesService.StartTraining(heroId, trainerId);
            logger.LogDebug($"StartTraining:: response [result:'{JsonConvert.SerializeObject(heroItem)}']");
            return heroItem == null ? NotFound($"Hero id '{heroId}' not found") : Ok(heroItem);
        }
    }
}
