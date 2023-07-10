using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace PmfBff.Models
{
    //[ExcludeFromCodeCoverage]
    public class PmfRestRequest 
    {
        [DataType(DataType.Text)]
        public string Method { get; set; }
        [DataType(DataType.Text)]
        public string Url { get; set; }
        [DataType(DataType.Text)]
        public string ServicePath { get; set; }
        public Dictionary<string, string> Params { get; set; }
        public Dictionary<string, string> Headers { get; set; }
        public dynamic Body { get; set; }
        public bool Allow404 { get; set; }

        public PmfRestRequest(
            string Method, 
            string Url, 
            string ServicePath, 
            Dictionary<string, string> Params,
            Dictionary<string, string> Headers,
            dynamic Body,
            bool Allow404)
        {
            this.Method = Method;
            this.Url = Url;
            this.ServicePath = ServicePath;
            this.Params = Params;
            this.Headers = Headers;
            this.Body = Body;
            this.Allow404 = Allow404;
        }

        public PmfRestRequest(
            string Method,
            string Url,
            string ServicePath,
            dynamic Body,
            bool Allow404 = true)
        {
            this.Method = Method;
            this.Url = Url;
            this.ServicePath = ServicePath;
            this.Params = new Dictionary<string, string>();
            this.Headers = new Dictionary<string, string>();
            this.Body = Body;
            this.Allow404 = Allow404;
        }

        public PmfRestRequest(
           string Method,
           string Url,
           string ServicePath)
        {
            this.Method = Method;
            this.Url = Url;
            this.ServicePath = ServicePath;
            this.Params = new Dictionary<string, string>();
            this.Headers = new Dictionary<string, string>();
            this.Allow404 = true;
        }

    }
}