using System;

namespace Crypto.Blazor.Shared.State
{
    public class AppState
    {
        public bool IsMenuOpen { get; private set; } = false;
        public bool IsScrolled { get; private set; } = false;
        public Action? IsMenuOpenEvent { get; set; }
        public Action? IsScrolledEvent { get; set; }
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
    }
}