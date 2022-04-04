using Crypto.Blazor.Shared.Models;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;

namespace Crypto.Blazor.Server.Controllers
{
    [Route("[controller]/[action]")]
    public class MarketController : Controller
    {
        static HttpClient client = new HttpClient();

        public async Task<IActionResult> GetMarketsAsync()
        {
            List<Market>? markets = null;
            
            try
            {
                HttpResponseMessage response = await client.GetAsync("https://crypto.transfero.com/api/v1/markets");
                if (response.IsSuccessStatusCode)
                {
                    markets = await response.Content.ReadFromJsonAsync<List<Market>>();
                }
            }
            catch (System.Exception)
            {
                return new JsonResult(markets);
            }
        
            return new JsonResult(markets);
        }
    }
}