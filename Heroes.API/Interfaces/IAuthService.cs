using Heroes.Contracts.Login;
using Heroes.Contracts.Register;
using System.Threading.Tasks;

namespace Heroes.API.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponseDTO> LoginAsync(LoginRequestDTO request);
        Task<RegisterResponseDTO> RegisterAsync(RegisterRequestDTO request);
        Task<bool> CheckUsernameIsExistAsync(string username);
    }
}
