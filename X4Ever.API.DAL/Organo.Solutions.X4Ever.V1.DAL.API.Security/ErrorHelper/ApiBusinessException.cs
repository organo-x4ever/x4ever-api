﻿namespace Organo.Solutions.X4Ever.V1.API.Security.ErrorHelper
{
    using System;
    using System.Net;
    using System.Runtime.Serialization;

    /// <summary>
    /// Api Business Exception
    /// </summary>
    [Serializable]
    [DataContract]
    public class ApiBusinessException : Exception, IApiExceptions
    {
        #region Public Serializable properties.

        [DataMember]
        public int ErrorCode { get; set; }

        [DataMember]
        public string ErrorDescription { get; set; }

        [DataMember]
        public HttpStatusCode HttpStatus { get; set; }

        private string reasonPhrase = "ApiBusinessException";

        [DataMember]
        public string ReasonPhrase
        {
            get { return this.reasonPhrase; }

            set { this.reasonPhrase = value; }
        }

        #endregion Public Serializable properties.

        #region Public Constructor.

        /// <summary>
        /// Public constructor for Api Business Exception
        /// </summary>
        /// <param name="errorCode">
        /// </param>
        /// <param name="errorDescription">
        /// </param>
        /// <param name="httpStatus">
        /// </param>
        public ApiBusinessException(int errorCode, string errorDescription, HttpStatusCode httpStatus)
        {
            ErrorCode = errorCode;
            ErrorDescription = errorDescription;
            HttpStatus = httpStatus;
        }

        #endregion Public Constructor.
    }
}