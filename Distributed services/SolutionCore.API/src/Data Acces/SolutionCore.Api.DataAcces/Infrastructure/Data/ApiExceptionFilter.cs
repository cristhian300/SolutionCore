namespace Belcorp.CM.Infrastructure.Web.ExceptionHandling
{
    using System;
    using System.IO;
    using Belcorp.CM.Infrastructure.CrossCutting.Constants;
    //using Belcorp.CM.Infrastructure.CrossCutting.Exceptions.Domain;
    //using Belcorp.CM.Infrastructure.Transport.Core.Response;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;
    using Microsoft.Extensions.Logging;

    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        private readonly ILogger<ApiExceptionFilter> _logger;

        public ApiExceptionFilter(ILogger<ApiExceptionFilter> logger)
        {
            _logger = logger;
        }

        //public override void OnException(ExceptionContext context)
        //{
        //    ApiError apiError = null;
        //    BaseResponse baseResponse = null;

        //    if (context.Exception is ApiException)
        //    {
        //        // handle explicit 'known' API errors
        //        var ex = context.Exception as ApiException;
        //        context.Exception = null;
        //        apiError = new ApiError(ex.Message, Constants.ErrorType.APP);
        //        apiError.errors = ex.Errors;

        //        context.HttpContext.Response.StatusCode = ex.StatusCode;

        //        _logger.LogWarning($"Application thrown error: {ex.Message}", ex);
        //    }
        //    if (context.Exception is UnauthorizedAccessException)
        //    {
        //        apiError = new ApiError("Unauthorized Access", Constants.ErrorType.APP);
        //        context.HttpContext.Response.StatusCode = 401;
        //        _logger.LogWarning("Unauthorized access in controller filter.");
        //    }
        //    else if (context.Exception is DomainException)
        //    {
        //        var ex = context.Exception as DomainException;
        //        context.Exception = null;

        //        baseResponse = new BaseResponse();
        //        baseResponse.State.HasError = true;
        //        baseResponse.State.TipoError = Constants.ErrorType.Domain;
        //        baseResponse.State.MensajeError = ex.Message;

        //        context.ExceptionHandled = true;
        //    }
        //    else
        //    {
        //        // Unhandled errors
        //        var msg = context.Exception.GetBaseException().Message;
        //        string stack = context.Exception.StackTrace;

        //        apiError = new ApiError(msg, Constants.ErrorType.APP);
        //        apiError.detail = stack;

        //        context.HttpContext.Response.StatusCode = 500;

        //        string body;
        //        var position = (long)0;

        //        if (context.HttpContext.Request.Body.CanSeek)
        //        {
        //            position = context.HttpContext.Request.Body.Position;
        //            context.HttpContext.Request.Body.Seek(0, SeekOrigin.Begin);
        //            using (StreamReader reader = new StreamReader(context.HttpContext.Request.Body))
        //            {
        //                body = reader.ReadToEnd();
        //                context.HttpContext.Request.Body.Seek(position, SeekOrigin.Begin);
        //            }
        //        }
        //        else
        //        {
        //            using (StreamReader reader = new StreamReader(context.HttpContext.Request.Body))
        //            {
        //                body = reader.ReadToEnd();
        //            }
        //        }

        //        var queryString = context.HttpContext.Request.QueryString.Value;

        //        // handle logging here
        //        _logger.LogError(context.Exception.GetBaseException().StackTrace, context.Exception);
        //    }

        //    // always return a JSON result
        //    if (baseResponse != null)
        //    {
        //        context.Result = new JsonResult(baseResponse);
        //    }
        //    else
        //    {
        //        context.Result = new JsonResult(apiError);
        //    }

        //    base.OnException(context);
        //}
    }
}
