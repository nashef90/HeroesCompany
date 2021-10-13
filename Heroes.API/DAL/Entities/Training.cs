using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Heroes.API.DAL.Entities
{
    internal class Training : BaseEntity
    {
        public Guid HeroId { get; set; }
        public Guid TrainerId { get; set; }
        public double PowerGrowth { get; set; }
        public double NewHeroPower { get; set; }
    }
}
