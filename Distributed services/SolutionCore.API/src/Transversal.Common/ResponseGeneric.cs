using System;
using System.Collections.Generic;
using System.Text;
//using FluentValidation.Results;

namespace Transversal.Common
{
    public class ResponseGeneric<T>
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
        
        //public IEnumerable<ValidationFailure> Errors { get; set; }
    }
}
