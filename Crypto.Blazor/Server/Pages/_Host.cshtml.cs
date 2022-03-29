using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc;



public class _Host : PageModel
{
    [BindProperty(Name = "culture", SupportsGet = true)]
    public string? Culture { get; set; }
}
