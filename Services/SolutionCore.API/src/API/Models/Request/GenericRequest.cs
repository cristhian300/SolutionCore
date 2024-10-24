using RestSharp;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace PmfBff.Models.Request
{
    //[ExcludeFromCodeCoverage]
    public class GenericRequest
    {
        public Method Method { get; set; }

        [DataType(DataType.Text)]
        public string Url { get; set; }

        [DataType(DataType.Text)]
        public string ServicePath { get; set; }

        public Dictionary<string, string> Params { get; set; }

        public Dictionary<string, string> Headers { get; set; }

        public object Body { get; set; }
    }
}
