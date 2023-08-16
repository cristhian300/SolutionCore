using Evaluacion.Models;
using Microsoft.AspNetCore.Mvc;
using YtMovieApis.Models.DTO;

namespace YtMovieApis.Repositories.Abstract
{
    public interface IAuthorizaService
    {
        Task<RestResponse> Registration(RegistrationModel model);

        Task<RestResponse> Login(LoginModel model);
    }
}
