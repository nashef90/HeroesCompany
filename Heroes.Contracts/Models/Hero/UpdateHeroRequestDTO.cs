﻿using System;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using static Heroes.Contracts.Enums;

namespace Heroes.Contracts.Models.Hero
{
    public class UpdateHeroRequestDTO
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public HeroAbility Ability { get; set; }
        [Required]
        public SuitColorDTO SuitColor { get; set; }
    }
}
