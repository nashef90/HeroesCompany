using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Heroes.Contracts.Enums;

namespace Heroes.API.DAL.Entities
{
    internal class Hero : BaseEntity
    {
        public string Name { get; set; }
        public HeroAbility Ability { get; set; }
        public Guid TrainerId { get; set; }
        public DateTime? FirstTraining { get; set; }
        public Color SuitColor { get; set; }
        public double StartingPower { get; set; }
        public double CurrentPower { get; set; }
    }
}
