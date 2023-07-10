using System.Diagnostics.CodeAnalysis;

namespace PmfBff.Helpers
{
    [ExcludeFromCodeCoverage]
    public class Functions
    {
        public static string SanitizeData(object data)
        {
            return System.Web.HttpUtility.HtmlEncode(data);
        }
    }


    public enum StatusQualification : int
    {
        Assigned = 2,
        NotAssigned = 0,
        expired = 1
    }


}
