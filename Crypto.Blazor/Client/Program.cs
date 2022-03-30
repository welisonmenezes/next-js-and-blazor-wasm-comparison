using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Crypto.Blazor.Shared.State;
using System.Globalization;
using Microsoft.JSInterop;
using System.Text.Json;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
//builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");
builder.Services.AddLocalization();

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddSingleton<AppState>();

builder.Services.AddLocalization();

var host = builder.Build();

string[] supportedCultures = { "en", "es", "pt" };
string defaultCulture = "pt";
string serializedSupportedCultures = JsonSerializer.Serialize(supportedCultures);
CultureInfo culture;

var js = host.Services.GetRequiredService<IJSRuntime>();
string definedCulture = await js.InvokeAsync<string>("blazorCulture.get");
string queryCulture = await js.InvokeAsync<string>("blazorCulture.getQueryCulture", JsonSerializer.Serialize(supportedCultures));
bool haveToSetDefaultCulture = await js.InvokeAsync<bool>("blazorCulture.haveToSetDefaultCulture", JsonSerializer.Serialize(supportedCultures), defaultCulture);

if (definedCulture != null && !string.IsNullOrEmpty(definedCulture))
{
    if (haveToSetDefaultCulture) 
    {
        if (!string.IsNullOrEmpty(queryCulture) && queryCulture != definedCulture) {
            culture = new CultureInfo(queryCulture);
            await js.InvokeAsync<string>("blazorCulture.set", queryCulture);
        }
        else 
        {    
            culture = new CultureInfo(defaultCulture);
            await js.InvokeAsync<string>("blazorCulture.set", defaultCulture);
        }
    }
    else 
    {
        culture = new CultureInfo(definedCulture);
    }
}
else
{
    culture = new CultureInfo(defaultCulture);
    await js.InvokeAsync<string>("blazorCulture.set", defaultCulture);
}

CultureInfo.DefaultThreadCurrentCulture = culture;
CultureInfo.DefaultThreadCurrentUICulture = culture;

await host.RunAsync();
