using System;

namespace Heroes.Contracts.Register
{
    public class RegisterResponseDTO
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Token { get; set; }
    }
}
