using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Crypto.Blazor.Client;
using Crypto.Blazor.Shared.State;
using System.Globalization;
using Microsoft.JSInterop;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");
builder.Services.AddLocalization();

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddSingleton<AppState>();

builder.Services.AddLocalization();

var host = builder.Build();

CultureInfo culture;
var js = host.Services.GetRequiredService<IJSRuntime>();
string definedCulture = await js.InvokeAsync<string>("blazorCulture.get");

if (definedCulture != null && !string.IsNullOrEmpty(definedCulture))
{
    culture = new CultureInfo(definedCulture);
}
else
{
    culture = new CultureInfo("pt");
    await js.InvokeVoidAsync("blazorCulture.set", "pt");
}

CultureInfo.DefaultThreadCurrentCulture = culture;
CultureInfo.DefaultThreadCurrentUICulture = culture;

await host.RunAsync();
