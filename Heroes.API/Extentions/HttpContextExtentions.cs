using Microsoft.AspNetCore.Http;
using System;
using System.Linq;

namespace Heroes.API.Extentions
{
    public static class HttpContextExtentions
    {
        public static Guid GetTrainerId(this HttpContext httpContext)
        {
            string id = httpContext.User.Claims.First(i => i.Type == "Id")?.Value;
            return Guid.Parse(id);
        }
    }
}
