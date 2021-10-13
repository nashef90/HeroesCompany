using System;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using static Heroes.Contracts.Enums;

namespace Heroes.Contracts.Models.Hero
{
    public class AddHeroRequestDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public HeroAbility Ability { get; set; }
        [Required]
        public SuitColorDTO SuitColor { get; set; }
        [Required]
        [Range(0.01, double.MaxValue)]
        public double StartingPower { get; set; }
    }
}
