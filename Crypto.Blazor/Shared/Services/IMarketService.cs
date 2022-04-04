using Crypto.Blazor.Shared.Models;

namespace Crypto.Blazor.Shared.Service
{
    public interface IMarketService
    {
        Task<IEnumerable<Market>?> GetMarkets();
    }
}