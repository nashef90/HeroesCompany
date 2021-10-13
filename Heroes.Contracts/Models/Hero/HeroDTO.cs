using System;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using static Heroes.Contracts.Enums;

namespace Heroes.Contracts.Models.Hero
{
    public class HeroDTO
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public HeroAbility Ability { get; set; }
        public DateTime? FirstTraining { get; set; }
        [Required]
        public SuitColorDTO SuitColor { get; set; }
        [Required]
        public double StartingPower { get; set; }
        [Required]
        public double CurrentPower { get; set; }
        public bool CanStartTraining { get; set; }
    }
}
