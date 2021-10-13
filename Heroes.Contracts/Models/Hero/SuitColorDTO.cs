using System;
using System.ComponentModel.DataAnnotations;

namespace Heroes.Contracts.Models.Hero
{
    public class SuitColorDTO
    {
        [Required]
        [Range(0, 255)]
        public int Red { get; set; }
        [Required]
        [Range(0, 255)]
        public int Green { get; set; }
        [Required]
        [Range(0, 255)]
        public int Blue { get; set; }
    }
}
