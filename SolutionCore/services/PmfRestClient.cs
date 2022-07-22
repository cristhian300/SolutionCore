using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using PmfBff.Interfaces;
using PmfBff.Models;
using PmfBff.Models.Errors;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using PmfBff.Helpers;
using System.Diagnostics.CodeAnalysis;
using PmfBff.Domain.Shared.Constants;
using PmfBff.Models.Request;
using PmfBff.Application.Models.Response;

namespace PmfBff.Services
{
    //[ExcludeFromCodeCoverage]
    public class PmfRestClient : Controller, IPmfRestClient
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<PmfRestClient> _logger;
        public PmfRestClient(IConfiguration configuration, ILogger<PmfRestClient> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<PmfRestResponse> ExecuteClientRequest(PmfRestRequest request)
        {
            try
            {
                Method method = new Method();
                switch (request.Method.ToUpper())
                {
                    case "POST":
                        method = Method.POST;
                        break;
                    case "GET":
                        method = Method.GET;
                        break;
                    case "PUT":
                        method = Method.PUT;
                        break;
                    case "DELETE":
                        method = Method.DELETE;
                        break;
                    case "PATCH":
                        method = Method.PATCH;
                        break;
                    case "COPY":
                        method = Method.COPY;
                        break;
                    case "MERGE":
                        method = Method.MERGE;
                        break;
                    case "HEAD":
                        method = Method.HEAD;
                        break;
                    case "OPTIONS":
                        method = Method.OPTIONS;
                        break;
                    default:
                        Exception ex = new Exception("No HTTP method has been specified");
                        throw ex;
                }

                _logger.LogInformation("REST Client request Method: {@Method} - Service: {@Service} - Endpoint: {@Endpoint}", Functions.SanitizeData(request.Method.ToUpper()), Functions.SanitizeData(request.ServicePath), Functions.SanitizeData(request.Url));

                RestClient client = new RestClient(_configuration[$"Services:{request.ServicePath}"]);
                RestSharp.RestRequest requestsItems = new RestSharp.RestRequest(request.Url, method);

                foreach (KeyValuePair<string, string> item in request.Params)
                {
                    requestsItems.AddParameter(item.Key, item.Value);
                }

                foreach (KeyValuePair<string, string> item in request.Headers)
                {
                    requestsItems.AddHeader(item.Key, item.Value);
                }

                Dictionary<string, string> body = new Dictionary<string, string>();

                if (request.Method == "PATCH")
                {
                    requestsItems.AddParameter("application/json-patch+json", request.Body, ParameterType.RequestBody);
                    requestsItems.AddHeader("Authorization", $"Bearer {_configuration["TokenMS:token"]}");
                    requestsItems.OnBeforeDeserialization = resp => { resp.ContentType = "application/json-patch+json"; };
                }
                else
                {
                    if (client.BaseUrl.ToString() != _configuration["SAR-Services:recaptcha"])
                    {
                        requestsItems.AddParameter("application/json; charset=utf-8", request.Body, ParameterType.RequestBody);

                        if (client.BaseUrl.ToString() != _configuration["Services:IIB-QualificationDetailsChanged"] &&
                            client.BaseUrl.ToString() != _configuration["Services:IIB-ContractorDetails"] &&
                            client.BaseUrl.ToString() != _configuration["Services:IIB-PersonnelWorkSchedule"])
                        {
                            requestsItems.AddHeader("Authorization", $"Bearer {_configuration["TokenMS:token"]}");
                        }
                        else if (client.BaseUrl.ToString() == _configuration["Services:IIB-ContractorDetails"] && bool.Parse(_configuration["IIBCredentials:activeNewEndPoints"]))
                        {
                            _logger.LogInformation($"IIB ContractorDetails detected");
                            requestsItems.AddHeader("Authorization", $"Basic {System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(_configuration["IIBCredentials:contractorDetails:user"] + ":" + _configuration["IIBCredentials:contractorDetails:password"]))}");
                        }
                        else
                        {
                            requestsItems.AddHeader("Authorization", $"Basic {System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(_configuration["IIBCredentials:user"] + ":" + _configuration["IIBCredentials:pass"]))}");
                        }
                    }
                    requestsItems.OnBeforeDeserialization = resp => { resp.ContentType = "application/json"; };
                }


                var requestToLog = new
                {
                    resource = requestsItems.Resource,
                    parameters = requestsItems.Parameters.Select(parameter => new
                    {
                        name = parameter.Name,
                        value = parameter.Value,
                        type = parameter.Type.ToString()
                    }),
                    method = request.Method.ToString(),
                    uri = client.BuildUri(requestsItems)
                };

                Guid guid = Guid.NewGuid();
                string strId = guid.ToString();
                _logger.LogInformation($"REST Client3 Request {strId} log: {JsonConvert.SerializeObject(requestToLog)}");

                IRestResponse response = await client.ExecuteAsync(requestsItems);
                dynamic content;

                _logger.LogInformation($"REST Client response {strId}: HTTP {response.StatusCode} - {response.ErrorMessage} - {response.ErrorException}");

                if (response.StatusCode == HttpStatusCode.OK ||
                    response.StatusCode == HttpStatusCode.Created ||
                    response.StatusCode == HttpStatusCode.Conflict ||
                    response.StatusCode == HttpStatusCode.NoContent ||
                    response.StatusCode == HttpStatusCode.BadRequest)
                {
                    try
                    {
                        content = JsonConvert.DeserializeObject<JToken>(response.Content);

                        if (content is JArray)
                        {
                            content = content.ToObject<JArray>();
                        }
                        else if (content is JObject)
                        {
                            content = content.ToObject<JObject>();
                        }
                    }
                    catch (Exception e)
                    {
                        if (e.GetType().Name == "JsonReaderException" || e.GetType().Name == "InvalidCastException")
                        {
                            _logger.LogError($"REST Client Deserialization error: {e.GetType().Name} {e.Message} {e.StackTrace}");
                            return new PmfRestResponse(HttpStatusCode.InternalServerError, null);
                        }
                        else
                        {
                            _logger.LogError($"REST Client error: {e.GetType().Name} {e.Message} {e.StackTrace}");
                            return new PmfRestResponse(HttpStatusCode.InternalServerError, null);
                        }
                    }
                    return new PmfRestResponse(response.StatusCode, content);
                }

                else
                {
                    if (request.Allow404 && response.StatusCode == HttpStatusCode.NotFound)
                    {
                        return new PmfRestResponse(HttpStatusCode.NoContent, new JArray());
                    }
                    else
                    {
                        switch (response.StatusCode)
                        {
                            case HttpStatusCode.BadRequest:
                                throw new ArgumentException("Bad Request", HttpStatusCode.BadRequest.ToString());
                            case HttpStatusCode.NotFound:
                                throw new ArgumentException("Not Found", HttpStatusCode.NotFound.ToString());
                            default:
                                throw new ArgumentException("Internal Server Error", HttpStatusCode.InternalServerError.ToString());
                        }
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"Error: {e.Message}");
                _logger.LogError(JsonConvert.SerializeObject(e));
                return new PmfRestResponse(HttpStatusCode.InternalServerError, MessageConstant.Error);
            }
        }


        //This method is for references only, do not use as it does not return HTTP calls. HTTP returns only works from main, parent ActionResult methods. 
        public ActionResult ForceResponseToFront(PmfRestResponse response)
        {
            if (!ModelState.IsValid) return StatusCode(500, new InternalServerError("HTTP 500 Internal Server Error"));

            switch (response.Status)
            {
                case HttpStatusCode.Created:
                    return StatusCode(201, response.JSON);
                case HttpStatusCode.NoContent:
                    return NoContent();
                case HttpStatusCode.BadRequest:
                    return BadRequest(new BadRequestError("HTTP 400 Bad Request"));
                case HttpStatusCode.NotFound:
                    return NotFound(new NotFoundError("HTTP 404 Not Found"));
                case HttpStatusCode.InternalServerError:
                    return StatusCode(500, new InternalServerError("HTTP 500 Internal Server Error"));
                default:
                    return StatusCode(500, new InternalServerError("HTTP 500 Internal Server Error"));
            }
        }

        public async Task<BaseResponse<T>> ExecuteClientGenericRequest<T>(GenericRequest request)
        {
            var result = new BaseResponse<T>();

            IRestResponse response = await ExecuteClientAsync(request);

            result.Payload = ValidateHttpClientGenericResponse<T>(response, request.Url);
            result.Code = response.StatusCode;
            result.Description = "OK";
            return result;
        }
        /*
        public async Task<T> ExecuteClientGenericSimpleRequest<T>(GenericRequest request)
        {
            IRestResponse response = await ExecuteClientAsync(request);

            return ValidateHttpClientGenericResponse<T>(response, request.Url);
        }
        */
        private T ValidateHttpClientGenericResponse<T>(IRestResponse response, string request)
        {
            if (response.StatusCode == HttpStatusCode.OK ||
                response.StatusCode == HttpStatusCode.Created ||
                response.StatusCode == HttpStatusCode.NoContent ||
                response.StatusCode == HttpStatusCode.Conflict
                )
            {
                try
                {
                    var content = JsonConvert.DeserializeObject<T>(response.Content);
                    _logger.LogInformation("HTTP {@StatusCode} - {@Response}", Functions.SanitizeData(response.StatusCode), response);

                    return content;
                }
                catch (Exception)
                {
                    throw new ArgumentException($"{request} - Bad deserialize object", HttpStatusCode.InternalServerError.ToString());
                }
            }
            else
            {
                _logger.LogInformation("HTTP {@StatusCode} - {@Response}", Functions.SanitizeData(response.StatusCode), response);
                switch (response.StatusCode)
                {
                    case HttpStatusCode.BadRequest:
                        throw new ArgumentException($"{request} - Bad Request", HttpStatusCode.BadRequest.ToString());
                    case HttpStatusCode.NotFound:
                        throw new ArgumentException($"{request} - Not Found", HttpStatusCode.NotFound.ToString());
                    case HttpStatusCode.Conflict:
                        throw new ArgumentException($"{request} - Conflict", HttpStatusCode.Conflict.ToString());
                    default:
                        throw new ArgumentException($"{request} - Internal Server Error", HttpStatusCode.InternalServerError.ToString());
                }
            }
        }

        private async Task<IRestResponse> ExecuteClientAsync(GenericRequest request)
        {
            _logger.LogInformation("REST Client request Method: {@Method} - Service: {@Service} - Endpoint: {@Endpoint}", Functions.SanitizeData(request.Method), Functions.SanitizeData(request.ServicePath), Functions.SanitizeData(request.Url));

            RestClient client = new RestClient(_configuration["Services:" + request.ServicePath]);
            RestRequest requestsItems = new RestRequest(request.Url, request.Method);

            if (request.Params != null)
            {
                foreach (KeyValuePair<string, string> item in request.Params)
                {
                    requestsItems.AddParameter(item.Key, item.Value);
                }
            }

            if (request.Headers != null)
            {
                foreach (KeyValuePair<string, string> item in request.Headers)
                {
                    requestsItems.AddHeader(item.Key, item.Value);
                }
            }

            Dictionary<string, string> body = new Dictionary<string, string>();
            if (request.Method == Method.PATCH)
            {
                requestsItems.AddParameter("application/json-patch+json", request.Body, ParameterType.RequestBody);
                requestsItems.AddHeader("Authorization", $"Bearer {_configuration["TokenMS:token"]}");
                requestsItems.OnBeforeDeserialization = resp => { resp.ContentType = "application/json-patch+json"; };
            }
            else
            {
                if (request.Body != null)
                {
                    var dby = JsonConvert.SerializeObject(request.Body, Formatting.None);

                    requestsItems.AddParameter("application/json; charset=utf-8", dby, ParameterType.RequestBody);
                }

                requestsItems.AddHeader("Authorization", $"Bearer {_configuration["TokenMS:token"]}");
                requestsItems.OnBeforeDeserialization = resp => { resp.ContentType = "application/json"; };
            }

            return await client.ExecuteAsync(requestsItems);
        }
    }
}


