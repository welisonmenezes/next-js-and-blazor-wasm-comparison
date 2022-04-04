namespace Crypto.Blazor.Shared.Models
{
    public class Market
    {
        public string? Id { get; set; }
        public string  Ticker { get; set; } = "";
        public string QuoteCurrency { get; set; } = "";
        public string BaseCurrency { get; set; } = "";
        public double Price { get; set; } = 0;
    }
}