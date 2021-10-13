using Heroes.API.DAL.Entities;
using Heroes.Contracts.Models.Hero;

namespace Heroes.API.Extentions
{
    internal static class HeroExtentions
    {
        internal static HeroDTO GetHeroDTO(this Hero hero, bool canStartTraining)
        {
            return new HeroDTO()
            {
                Id = hero.Id,
                Name = hero.Name,
                Ability = hero.Ability,
                FirstTraining = hero.FirstTraining,
                SuitColor = hero.SuitColor.GetSuitColorDTO(),
                StartingPower = hero.StartingPower,
                CurrentPower = hero.CurrentPower,
                CanStartTraining = canStartTraining,
            };
        }
    }
}
