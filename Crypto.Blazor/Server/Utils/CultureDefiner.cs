using System.Globalization;
using Crypto.Blazor.Shared.State;

public class CultureDefiner
{
    public static void DefineCulture(HttpContext context)
    {
        string[] suportedCultures = AppState.SupportedCultures;
        string defaultCulture = AppState.DefaultCulture;
        string queryStringKey = AppState.QueryStringKey;

        if (!string.IsNullOrEmpty(context.Request.Query[queryStringKey]))
        {
            if(!suportedCultures.Any(str => str == context.Request.Query[queryStringKey]))
            {
                CultureInfo.CurrentCulture = new CultureInfo(defaultCulture);
                CultureInfo.CurrentUICulture = new CultureInfo(defaultCulture);
            }
            else
            {
                CultureInfo.CurrentCulture = new CultureInfo(context.Request.Query[queryStringKey]);
                CultureInfo.CurrentUICulture = new CultureInfo(context.Request.Query[queryStringKey]);
            }
        }
        else
        {
            CultureInfo.CurrentCulture = new CultureInfo(defaultCulture);
            CultureInfo.CurrentUICulture = new CultureInfo(defaultCulture);
        }
    }
}