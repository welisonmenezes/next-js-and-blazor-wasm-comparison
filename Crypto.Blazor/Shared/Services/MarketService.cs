using Crypto.Blazor.Shared.Models;
using System.Net.Http.Json;

namespace Crypto.Blazor.Shared.Service
{
    public class MarketService : IMarketService
    {
        private readonly HttpClient HttpClient;

        public MarketService(HttpClient httpClient)
        {
            this.HttpClient = httpClient;
        }

        public async Task<IEnumerable<Market>?> GetMarkets()
        {
            return await HttpClient.GetFromJsonAsync<Market[]>("/Market/GetMarkets");
        }
    }
}