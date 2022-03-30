using System.Globalization;
using System.Runtime.InteropServices;
using Crypto.Blazor.Shared.State;
using Microsoft.AspNetCore.Localization;

var supportedCultures = new[] { "pt", "en", "es" };
string defaultCulture = supportedCultures[0];

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddSingleton<AppState>();
builder.Services.AddLocalization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseBlazorFrameworkFiles();
app.UseStaticFiles();

app.Use(async (context, next) =>
{
    Func<string, string> CleanCookie = (string cookie) =>
    {
        string[] subs = cookie.Split("=");
        return subs[subs.Count() - 1];
    };

    Action<string> SetCookieAndRedirect = (string value) =>
    {
        context.Response.Cookies.Append(
        CookieRequestCultureProvider.DefaultCookieName,
        CookieRequestCultureProvider.MakeCookieValue(
        new RequestCulture(value, value)));
        context.Response.Redirect(context.Request.Path + context.Request.QueryString);
    };

    var cookie = context.Request.Cookies[".AspNetCore.Culture"];

    if (string.IsNullOrEmpty(cookie) && string.IsNullOrEmpty(context.Request.Query["culture"]))
    {
        SetCookieAndRedirect(defaultCulture);
    }
    else if (string.IsNullOrEmpty(cookie) && !string.IsNullOrEmpty(context.Request.Query["culture"]))
    {
        SetCookieAndRedirect(context.Request.Query["culture"]);
    }
    else if (!string.IsNullOrEmpty(cookie) && cookie != null && !string.IsNullOrEmpty(context.Request.Query["culture"]))
    {
        string savedCulture = CleanCookie(cookie);
        if (!string.IsNullOrEmpty(savedCulture) && savedCulture != context.Request.Query["culture"])
        {
            SetCookieAndRedirect(context.Request.Query["culture"]);
        }
    }
    else if (!string.IsNullOrEmpty(cookie) && cookie != null && string.IsNullOrEmpty(context.Request.Query["culture"]))
    {
        string savedCulture = CleanCookie(cookie);
        if (savedCulture != defaultCulture)
        {
            SetCookieAndRedirect(defaultCulture);
        }
    }

    await next();
});

var localizationOptions = new RequestLocalizationOptions()
    .SetDefaultCulture(defaultCulture)
    .AddSupportedCultures(supportedCultures)
    .AddSupportedUICultures(supportedCultures);

app.UseRequestLocalization(localizationOptions);

app.UseRouting();

app.MapRazorPages();
app.MapControllers();
app.MapFallbackToPage("/_Host");

app.Run();
