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

string[] supportedCultures = AppState.SupportedCultures;
string defaultCulture = AppState.DefaultCulture;
string serializedSupportedCultures = JsonSerializer.Serialize(supportedCultures);
CultureInfo culture;

var js = host.Services.GetRequiredService<IJSRuntime>();
await js.InvokeVoidAsync("BlazorCulture.config", AppState.QueryStringKey, AppState.LocalStorageKey);
string definedCulture = await js.InvokeAsync<string>("BlazorCulture.get");
string queryCulture = await js.InvokeAsync<string>("BlazorCulture.getQueryStringValue", JsonSerializer.Serialize(supportedCultures));
bool haveToSetDefaultCulture = await js.InvokeAsync<bool>("BlazorCulture.haveToSetDefaultCulture", JsonSerializer.Serialize(supportedCultures), defaultCulture);

if (definedCulture != null && !string.IsNullOrEmpty(definedCulture))
{
    if (haveToSetDefaultCulture) 
    {
        if (!string.IsNullOrEmpty(queryCulture) && queryCulture != definedCulture) {
            culture = new CultureInfo(queryCulture);
            await js.InvokeAsync<string>("BlazorCulture.set", queryCulture);
        }
        else 
        {    
            culture = new CultureInfo(defaultCulture);
            await js.InvokeAsync<string>("BlazorCulture.set", defaultCulture);
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
    await js.InvokeAsync<string>("BlazorCulture.set", defaultCulture);
}

CultureInfo.DefaultThreadCurrentCulture = culture;
CultureInfo.DefaultThreadCurrentUICulture = culture;

await host.RunAsync();
