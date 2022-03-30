using System.Globalization;

public class CultureDefiner
{
    public static void DefineCulture(HttpContext context)
    {
        string[] suportedCultures = { "en", "es", "pt" };
        string defaultCulture = "pt";

        if (!string.IsNullOrEmpty(context.Request.Query["culture"]))
        {
            if(!suportedCultures.Any(str => str == context.Request.Query["culture"]))
            {
                CultureInfo.CurrentCulture = new CultureInfo(defaultCulture);
                CultureInfo.CurrentUICulture = new CultureInfo(defaultCulture);
            }
            else
            {
                CultureInfo.CurrentCulture = new CultureInfo(context.Request.Query["culture"]);
                CultureInfo.CurrentUICulture = new CultureInfo(context.Request.Query["culture"]);
            }
        }
        else
        {
            CultureInfo.CurrentCulture = new CultureInfo(defaultCulture);
            CultureInfo.CurrentUICulture = new CultureInfo(defaultCulture);
        }
    }
}