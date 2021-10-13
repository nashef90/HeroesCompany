using Heroes.API.Configuration;
using Heroes.API.DAL;
using Heroes.API.DAL.Entities;
using Heroes.API.Extentions;
using Heroes.API.Interfaces;
using Heroes.Contracts.Models.Hero;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Heroes.API.Services
{
    internal class HeroesService : IHeroesService
    {
        private readonly ILogger<HeroesService> logger;
        private readonly HeroesContext context;
        private readonly IOptions<AppConfig> config;

        public HeroesService(HeroesContext context, IOptions<AppConfig> config, ILogger<HeroesService> logger)
        {
            this.context = context;
            this.config = config;
            this.logger = logger;
        }

        public async Task<List<HeroDTO>> Get(Guid trainerId)
        {
            logger.LogDebug($"-> Get [trainerId = '{trainerId}']");
            int maxQuantityOfTrainingPerHeroOnDay = config?.Value?.MaxQuantityOfTrainingPerHeroOnDay ?? 0;
            DateTime today = DateTime.Today;
            var list = await context.Trainings
                .Where(t => t.CreatedTime.Date == today && !t.IsDeleted)
                .GroupBy(t => t.HeroId)
                .Where(t => t.Count() >= maxQuantityOfTrainingPerHeroOnDay)
                .Select(x => x.Key)
                .Distinct()
                .ToListAsync();

            return await context.Heroes
                .Where(h => h.TrainerId == trainerId && !h.IsDeleted)
                .Select(h => h.GetHeroDTO(!list.Contains(h.Id)))
                .ToListAsync();
        }

        public async Task<HeroDTO> Get(Guid heroId, Guid trainerId)
        {
            logger.LogDebug($"-> Get [heroId = '{heroId}', trainerId = '{trainerId}']");
            Hero hero = await context.Heroes
                .Where(h => h.Id == heroId && h.TrainerId == trainerId && !h.IsDeleted)
                .FirstOrDefaultAsync();

            return hero?.GetHeroDTO(await IsTheHeroAllowedToTrainingToday(hero.Id, trainerId));
        }

        public async Task<HeroDTO> Add(AddHeroRequestDTO item, Guid trainerId)
        {
            logger.LogDebug($"-> Add [item = '{JsonConvert.SerializeObject(item)}', trainerId = '{trainerId}']");
            Hero newItem = new()
            {
                FirstTraining = null,
                IsDeleted = false,
                Name = item.Name,
                Ability = item.Ability,
                SuitColor = item.SuitColor.GetColor(),
                StartingPower = item.StartingPower,
                CurrentPower = item.StartingPower,
                TrainerId = trainerId
            };
            await context.Heroes.AddAsync(newItem);
            context.SaveChanges();

            return newItem.GetHeroDTO(true);
        }

        public async Task<HeroDTO> Update(UpdateHeroRequestDTO item, Guid trainerId)
        {
            logger.LogDebug($"-> Update [item = '{JsonConvert.SerializeObject(item)}', trainerId = '{trainerId}']");

            Hero hero = await context.Heroes
               .Where(h => h.Id == item.Id && h.TrainerId == trainerId && !h.IsDeleted)
               .FirstOrDefaultAsync();

            if (hero != null)
            {
                hero.Ability = item.Ability;
                hero.SuitColor = item.SuitColor.GetColor();
                hero.Name = item.Name;
                context.SaveChanges();
            }
            return hero?.GetHeroDTO(await IsTheHeroAllowedToTrainingToday(hero.Id, trainerId));
        }

        public async Task<bool> Delete(Guid heroId, Guid trainerId)
        {
            logger.LogDebug($"-> Delete [heroId = '{heroId}', trainerId = '{trainerId}']");
            Hero hero = await context.Heroes
                .Where(h => h.Id == heroId && h.TrainerId == trainerId && !h.IsDeleted)
                .FirstOrDefaultAsync();
            if (hero != null)
            {
                hero.IsDeleted = true;
                context.SaveChanges();
            }
            return hero != null;
        }

        public Task<bool> IsTheHeroAllowedToTrainingToday(Guid heroId, Guid trainerId)
        {
            int maxQuantityOfTrainingPerHeroOnDay = config?.Value?.MaxQuantityOfTrainingPerHeroOnDay ?? 0;
            DateTime today = DateTime.Today;

            var quantityOfTrainings = context.Trainings
                .Where(t => t.HeroId == heroId && t.CreatedTime.Date == today && !t.IsDeleted)
                .Count();

            return Task.FromResult(quantityOfTrainings < maxQuantityOfTrainingPerHeroOnDay);
        }

        public async Task<HeroDTO> StartTraining(Guid heroId, Guid trainerId)
        {
            DateTime startTime = DateTime.Now;
            Hero hero = await context.Heroes
                .FirstOrDefaultAsync(h => h.Id == heroId && h.TrainerId == trainerId && !h.IsDeleted);

            if (hero != null)
            {
                double powerGrowth = GetRandomPowerGrowth(hero.CurrentPower);
                context.Trainings.Add(new Training()
                {
                    HeroId = heroId,
                    TrainerId = trainerId,
                    IsDeleted = false,
                    PowerGrowth = powerGrowth,
                    NewHeroPower = hero.CurrentPower + powerGrowth,
                });
                hero.CurrentPower += powerGrowth;

                if (!hero.FirstTraining.HasValue)
                    hero.FirstTraining = startTime;

                context.SaveChanges();
            }
            return hero?.GetHeroDTO(await IsTheHeroAllowedToTrainingToday(hero.Id, trainerId));
        }

        private double GetRandomPowerGrowth(double currentPower)
        {
            Random rnd = new Random();
            int randomNumber = rnd.Next(config.Value.MaxPowerGrowth + 1);
            return currentPower * randomNumber / 100.0;
        }
    }
}
