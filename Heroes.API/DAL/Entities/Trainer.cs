using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Heroes.API.DAL.Entities
{
    internal class Trainer : BaseEntity
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
    }
}
