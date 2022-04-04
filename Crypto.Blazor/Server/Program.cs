using Crypto.Blazor.Shared.Service;
using Crypto.Blazor.Shared.State;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddSingleton<AppState>();
builder.Services.AddLocalization();

builder.Services.AddHttpClient<IMarketService, MarketService>(client =>
{
    client.BaseAddress = new Uri("https://localhost:7102/");
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseBlazorFrameworkFiles();
app.UseStaticFiles();

app.UseRouting();

app.MapRazorPages();
app.MapControllers();
app.MapFallbackToPage("/_Host");

app.Run();
