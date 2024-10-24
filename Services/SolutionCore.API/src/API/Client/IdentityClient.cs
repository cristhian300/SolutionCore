using System.Net.Http;

namespace SolutionCore.Client
{
    public class IdentityClient
    {

        private HttpClient _client;

        public IdentityClient(  HttpClient client)
        {
            _client = client;
        }

    }
}
