using System;

namespace Crypto.Blazor.Shared.State
{
    public class AppState
    {
        public bool IsMenuOpen { get; private set; } = false;
        public bool IsScrolled { get; private set; } = false;
        public Action? IsMenuOpenEvent { get; set; }
        public Action? IsScrolledEvent { get; set; }

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