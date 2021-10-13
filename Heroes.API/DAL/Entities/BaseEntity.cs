using System;
using System.Runtime.Serialization;

namespace Heroes.API.DAL.Entities
{
    internal abstract class BaseEntity
    {
        [DataMember] public Guid Id { get; set; }
        [DataMember] public DateTime CreatedTime { get; set; }
        [DataMember] public DateTime ModifiedTime { get; set; }
        [DataMember] public bool IsDeleted{ get; set; }

        public override int GetHashCode()
        {
            return $"{this.GetType()}_{Id}".GetHashCode();
        }
    }
}
