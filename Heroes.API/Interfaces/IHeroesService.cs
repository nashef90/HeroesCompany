using Heroes.Contracts.Models.Hero;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Heroes.API.Interfaces
{
    public interface IHeroesService
    {
        Task<List<HeroDTO>> Get(Guid trainerId);
        Task<HeroDTO> Get(Guid heroId, Guid trainerId);
        Task<HeroDTO> Add(AddHeroRequestDTO item, Guid trainerId);
        Task<HeroDTO> Update(UpdateHeroRequestDTO item, Guid trainerId);
        Task<bool> Delete(Guid heroId, Guid trainerId);
        Task<bool> IsTheHeroAllowedToTrainingToday(Guid heroId, Guid TrainerId);
        Task<HeroDTO> StartTraining(Guid heroId, Guid trainerId);
    }
}
