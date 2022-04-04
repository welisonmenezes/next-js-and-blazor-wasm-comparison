using Crypto.Blazor.Shared.Models;

namespace Crypto.Blazor.Shared.State
{
    public class AppState
    {
        public bool IsMenuOpen { get; private set; } = false;
        public bool IsScrolled { get; private set; } = false;
        public IEnumerable<Market>? Markets { get; private set; } = null;
        public Action? IsMenuOpenEvent { get; set; }
        public Action? IsScrolledEvent { get; set; }
        public Action? MarketEvent { get; set; }
        public static string[] SupportedCultures = { "en", "es", "pt" };
        public static string DefaultCulture = "pt";
        public static string QueryStringKey = "culture";
        public static string LocalStorageKey = "BlazorCulture";

        public void SetIsMenuOpen(bool state) 
        {
            this.IsMenuOpen = state;
            IsMenuOpenEvent?.Invoke();
        }

        public void SetIsScrolled(bool state) 
        {
            this.IsScrolled = state;
            IsScrolledEvent?.Invoke();
        }

        public void SetMarkets(IEnumerable<Market>? markets)
        {
            if (markets != null)
            {
                string[] interestedCurrencies = {"USDC", "USDT", "BTC", "ETH", "SOL", "XLM"};
                List<Market>? MarketsToReturn = new List<Market>();

                MarketsToReturn.Add(new Market
                {
                    Ticker = "BRZ",
                    QuoteCurrency = "BRZ",
                    BaseCurrency = "BRZ",
                    Price = 1.0
                });

                foreach (string currency in interestedCurrencies)
                {
                    Market? Filtered = GetCurrencyByName(markets, currency);
                    if (Filtered != null)
                    {
                        MarketsToReturn.Add(Filtered);
                    }
                }

                this.Markets = MarketsToReturn;
            }
            MarketEvent?.Invoke();
        }

        protected Market? GetCurrencyByName(IEnumerable<Market> markets, string name)
        {
            return markets.ToList().First(element => {
                return element.QuoteCurrency == "BRZ" && element.BaseCurrency == name;
            });
        }
    }
}